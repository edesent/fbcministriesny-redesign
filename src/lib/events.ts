// Pulls upcoming events from the church's public Google Calendar(s) by
// fetching the .ics feed(s) and parsing them — so the homepage can render its
// own styled event list instead of the Google Calendar iframe.
//
// No API key needed: the feeds are the calendars' public .ics URLs (see
// googleCalendar.icsUrls in site.ts). Recurring events (weekly services, etc.)
// are expanded; all times are resolved to the church's local zone.

import { googleCalendar } from "@/lib/site";

const TIME_ZONE = "America/New_York";
const HORIZON_DAYS = 150; // how far ahead to look
const MAX_STEPS = 400; // per-event recurrence expansion guard

export type UpcomingEvent = {
  id: string;
  title: string;
  location: string | null;
  isAllDay: boolean;
  startMs: number;
  monthLabel: string; // "JUN"
  dayLabel: string; // "7"
  weekdayLabel: string; // "Sunday"
  timeLabel: string | null; // "11:00 AM", or null for all-day
};

type RawDate = {
  y: number;
  mo: number;
  d: number;
  h: number;
  mi: number;
  isDate: boolean;
  isUtc: boolean;
};

// A BYDAY token: plain "SA" (every Saturday) has ordinal null; "2SA" (the 2nd
// Saturday of the month) or "-1TH" (the last Thursday) carries an ordinal —
// only meaningful for MONTHLY/YEARLY recurrence.
type ByDayEntry = { ordinal: number | null; day: number };

type Rrule = {
  freq: string;
  interval: number;
  count?: number;
  untilMs?: number;
  byDay?: ByDayEntry[];
  // FREQ=MONTHLY;BYDAY=SA;BYSETPOS=3 ("the 3rd Saturday of the month") — the
  // form Google Calendar's UI actually writes for "nth weekday" recurrence,
  // as opposed to the BYDAY=3SA shorthand handled by ByDayEntry.ordinal.
  bySetPos?: number;
};

type ParsedEvent = {
  start?: RawDate;
  title?: string;
  location?: string;
  rrule?: Rrule | null;
  status?: string;
  isAllDay?: boolean;
  exdates: Set<string>;
};

// ---------- ICS text helpers ----------

function unfold(s: string): string {
  // RFC 5545 line folding: a CRLF/LF followed by a space or tab continues the line.
  return s.replace(/\r?\n[ \t]/g, "");
}

function unescapeText(v: string): string {
  return v
    .replace(/\\n/gi, " ")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function parseIcsDate(value: string, isDateParam: boolean): RawDate | null {
  const dateOnly = /^(\d{4})(\d{2})(\d{2})$/.exec(value);
  if (dateOnly || isDateParam) {
    const m = dateOnly ?? /^(\d{4})(\d{2})(\d{2})/.exec(value);
    if (!m) return null;
    return { y: +m[1], mo: +m[2], d: +m[3], h: 0, mi: 0, isDate: true, isUtc: false };
  }
  const dt = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z)?$/.exec(value);
  if (!dt) return null;
  return { y: +dt[1], mo: +dt[2], d: +dt[3], h: +dt[4], mi: +dt[5], isDate: false, isUtc: dt[7] === "Z" };
}

// ---------- timezone math (no dependencies) ----------

const offsetFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function tzOffsetMs(instant: Date): number {
  const p = offsetFmt.formatToParts(instant).reduce<Record<string, string>>((a, x) => {
    a[x.type] = x.value;
    return a;
  }, {});
  return (
    Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - instant.getTime()
  );
}

// Interpret wall-clock y/mo/d/h/mi as TIME_ZONE local time → absolute ms (DST-aware).
function wallToMs(y: number, mo: number, d: number, h: number, mi: number): number {
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  return guess - tzOffsetMs(new Date(guess));
}

function rawToMs(r: RawDate): number {
  return r.isUtc ? Date.UTC(r.y, r.mo - 1, r.d, r.h, r.mi) : wallToMs(r.y, r.mo, r.d, r.h, r.mi);
}

// ---------- calendar arithmetic ----------

function addDays(r: RawDate, days: number): RawDate {
  const nd = new Date(Date.UTC(r.y, r.mo - 1, r.d) + days * 86400000);
  return { ...r, y: nd.getUTCFullYear(), mo: nd.getUTCMonth() + 1, d: nd.getUTCDate() };
}

function addMonths(r: RawDate, months: number): RawDate {
  const t = r.y * 12 + (r.mo - 1) + months;
  const ny = Math.floor(t / 12);
  const nmo = (t % 12) + 1;
  const daysInMonth = new Date(Date.UTC(ny, nmo, 0)).getUTCDate();
  return { ...r, y: ny, mo: nmo, d: Math.min(r.d, daysInMonth) };
}

function addYears(r: RawDate, years: number): RawDate {
  return { ...r, y: r.y + years };
}

// The calendar date of the ordinal-th weekday in a given month, RFC-5545
// style: positive counts from the 1st (2 = "2nd Saturday"), negative counts
// back from the end of the month (-1 = "last Thursday"). Returns null if that
// ordinal doesn't exist in the month (e.g. a "5th Friday" some months lack).
function nthWeekdayOfMonth(y: number, mo: number, weekday: number, ordinal: number): { d: number } | null {
  const daysInMonth = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  if (ordinal > 0) {
    const firstDow = new Date(Date.UTC(y, mo - 1, 1)).getUTCDay();
    const d = 1 + ((weekday - firstDow + 7) % 7) + (ordinal - 1) * 7;
    return d <= daysInMonth ? { d } : null;
  }
  if (ordinal < 0) {
    const lastDow = new Date(Date.UTC(y, mo - 1, daysInMonth)).getUTCDay();
    const d = daysInMonth - ((lastDow - weekday + 7) % 7) + (ordinal + 1) * 7;
    return d >= 1 ? { d } : null;
  }
  return null;
}

// The sorted day-of-month numbers matching any of the given weekdays.
function weekdayDatesInMonth(y: number, mo: number, weekdays: number[]): number[] {
  const daysInMonth = new Date(Date.UTC(y, mo, 0)).getUTCDate();
  const out: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const wd = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
    if (weekdays.includes(wd)) out.push(d);
  }
  return out;
}

function parseRrule(v: string): Rrule | null {
  const parts: Record<string, string> = {};
  v.split(";").forEach((kv) => {
    const i = kv.indexOf("=");
    if (i > 0) parts[kv.slice(0, i).toUpperCase()] = kv.slice(i + 1);
  });
  if (!parts.FREQ) return null;
  const rule: Rrule = {
    freq: parts.FREQ.toUpperCase(),
    interval: parts.INTERVAL ? Math.max(1, parseInt(parts.INTERVAL, 10)) : 1,
  };
  if (parts.COUNT) rule.count = parseInt(parts.COUNT, 10);
  if (parts.BYSETPOS) rule.bySetPos = parseInt(parts.BYSETPOS.split(",")[0], 10);
  if (parts.UNTIL) {
    const ud = parseIcsDate(parts.UNTIL, false);
    if (ud) rule.untilMs = rawToMs(ud);
  }
  if (parts.BYDAY) {
    const map: Record<string, number> = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };
    rule.byDay = parts.BYDAY.split(",")
      .map((tok): ByDayEntry | null => {
        const m = /^(-?\d{1,2})?(SU|MO|TU|WE|TH|FR|SA)$/.exec(tok.trim());
        if (!m) return null;
        return { ordinal: m[1] ? parseInt(m[1], 10) : null, day: map[m[2]] };
      })
      .filter((x): x is ByDayEntry => x !== null);
  }
  return rule;
}

function stepFreq(cur: RawDate, rule: Rrule): RawDate | null {
  if (rule.freq === "DAILY") return addDays(cur, rule.interval);
  if (rule.freq === "WEEKLY") return addDays(cur, 7 * rule.interval);
  if (rule.freq === "MONTHLY") return addMonths(cur, rule.interval);
  if (rule.freq === "YEARLY") return addYears(cur, rule.interval);
  return null;
}

// Jump a long-running recurrence close to "now" so we don't waste steps walking
// from a years-old start date. Skipped when COUNT is set (would break the tally).
function fastForward(start: RawDate, rule: Rrule, nowMs: number): RawDate {
  if (rule.count) return start;
  const startMs = rawToMs(start);
  if (startMs >= nowMs) return start;
  const dayMs = 86400000;
  const per: Record<string, number> = {
    DAILY: dayMs,
    WEEKLY: 7 * dayMs,
    MONTHLY: 30.44 * dayMs,
    YEARLY: 365.25 * dayMs,
  };
  const span = per[rule.freq];
  if (!span) return start;
  const n = Math.floor((nowMs - startMs) / (span * rule.interval)) - 2;
  if (n <= 0) return start;
  if (rule.freq === "DAILY") return addDays(start, n * rule.interval);
  if (rule.freq === "WEEKLY") return addDays(start, n * 7 * rule.interval);
  if (rule.freq === "MONTHLY") return addMonths(start, n * rule.interval);
  if (rule.freq === "YEARLY") return addYears(start, n * rule.interval);
  return start;
}

function expand(start: RawDate, rule: Rrule | null, horizonMs: number, nowMs: number): RawDate[] {
  if (!rule) return [start];
  const out: RawDate[] = [];

  if (rule.freq === "WEEKLY" && rule.byDay?.length) {
    let week = fastForward(start, rule, nowMs);
    const startMs = rawToMs(start);
    for (let w = 0; w < MAX_STEPS; w++) {
      const baseWd = new Date(Date.UTC(week.y, week.mo - 1, week.d)).getUTCDay();
      for (const bd of rule.byDay) {
        const occ = addDays(week, bd.day - baseWd);
        const ms = rawToMs(occ);
        if (ms < startMs) continue;
        if (rule.untilMs && ms > rule.untilMs) continue;
        if (ms <= horizonMs) out.push(occ);
      }
      week = addDays(week, 7 * rule.interval);
      if (rawToMs(week) > horizonMs) break;
    }
    return out;
  }

  // "Nth weekday of the month" recurrence. Google Calendar's UI writes this as
  // RRULE:FREQ=MONTHLY;BYDAY=SA;BYSETPOS=3 ("3rd Saturday"); the RFC 5545
  // shorthand RRULE:FREQ=MONTHLY;BYDAY=2SA means the same thing for a single
  // day. Either way this does NOT reduce to repeatedly adding a month to the
  // start date — the day-of-month for a given weekday shifts month to month,
  // so it must be recomputed each time.
  if (rule.freq === "MONTHLY" && rule.byDay?.length && (rule.bySetPos != null || rule.byDay.some((bd) => bd.ordinal != null))) {
    const startMs = rawToMs(start);
    const anchor = fastForward(start, rule, nowMs);
    let y = anchor.y;
    let mo = anchor.mo;
    for (let m = 0; m < MAX_STEPS; m++) {
      const daysThisMonth = new Set<number>();
      if (rule.bySetPos != null) {
        const matches = weekdayDatesInMonth(y, mo, rule.byDay.map((bd) => bd.day));
        const idx = rule.bySetPos > 0 ? rule.bySetPos - 1 : matches.length + rule.bySetPos;
        const d = matches[idx];
        if (d != null) daysThisMonth.add(d);
      } else {
        for (const bd of rule.byDay) {
          if (bd.ordinal == null) continue;
          const nth = nthWeekdayOfMonth(y, mo, bd.day, bd.ordinal);
          if (nth) daysThisMonth.add(nth.d);
        }
      }
      for (const d of daysThisMonth) {
        const occ: RawDate = { ...start, y, mo, d };
        const ms = rawToMs(occ);
        if (ms < startMs) continue;
        if (rule.untilMs && ms > rule.untilMs) continue;
        if (ms <= horizonMs) out.push(occ);
      }
      const t = y * 12 + (mo - 1) + rule.interval;
      y = Math.floor(t / 12);
      mo = (t % 12) + 1;
      if (rawToMs({ ...start, y, mo, d: 1 }) > horizonMs) break;
    }
    out.sort((a, b) => rawToMs(a) - rawToMs(b));
    return out;
  }

  let cur = fastForward(start, rule, nowMs);
  for (let s = 0; s < MAX_STEPS; s++) {
    const ms = rawToMs(cur);
    if (rule.untilMs && ms > rule.untilMs) break;
    if (ms > horizonMs) break;
    out.push(cur);
    const next = stepFreq(cur, rule);
    if (!next) break;
    cur = next;
  }
  return out;
}

// ---------- VEVENT parsing ----------

function parseEvents(text: string): ParsedEvent[] {
  if (!text.includes("BEGIN:VCALENDAR")) return [];
  const lines = unfold(text).split(/\r?\n/);
  const events: ParsedEvent[] = [];
  let cur: ParsedEvent | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      cur = { exdates: new Set() };
      continue;
    }
    if (line === "END:VEVENT") {
      if (cur && cur.start && cur.title) events.push(cur);
      cur = null;
      continue;
    }
    if (!cur) continue;
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const left = line.slice(0, idx);
    const value = line.slice(idx + 1);
    const name = left.split(";")[0].toUpperCase();
    const hasDateParam = left.split(";").slice(1).some((p) => /VALUE=DATE/i.test(p));

    if (name === "DTSTART") {
      cur.start = parseIcsDate(value, hasDateParam) ?? undefined;
      cur.isAllDay = cur.start?.isDate ?? false;
    } else if (name === "SUMMARY") {
      cur.title = unescapeText(value);
    } else if (name === "LOCATION") {
      cur.location = unescapeText(value);
    } else if (name === "RRULE") {
      cur.rrule = parseRrule(value);
    } else if (name === "STATUS") {
      cur.status = value;
    } else if (name === "EXDATE") {
      value.split(",").forEach((v) => {
        const m = /^(\d{8})/.exec(v);
        if (m) cur!.exdates.add(m[1]);
      });
    }
  }
  return events;
}

// ---------- public API ----------

const monthFmt = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, month: "short" });
const dayFmt = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, day: "numeric" });
const weekdayFmt = new Intl.DateTimeFormat("en-US", { timeZone: TIME_ZONE, weekday: "long" });
const timeFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

export async function getUpcomingEvents(limit = 4): Promise<UpcomingEvent[]> {
  const urls = googleCalendar.icsUrls?.filter(Boolean) ?? [];
  if (!urls.length) return [];

  const texts = await Promise.all(
    urls.map(async (url) => {
      try {
        // Always fetch fresh so the list stays in sync with the live calendar
        // (no stale cache when the church updates events).
        const res = await fetch(url, { cache: "no-store" });
        return res.ok ? await res.text() : "";
      } catch {
        return "";
      }
    }),
  );

  const now = Date.now();
  const horizon = now + HORIZON_DAYS * 86400000;
  const seen = new Set<string>();
  const collected: { title: string; location: string | null; isAllDay: boolean; startMs: number }[] = [];

  for (const text of texts) {
    for (const ev of parseEvents(text)) {
      if (!ev.start || !ev.title || ev.status === "CANCELLED") continue;
      for (const occ of expand(ev.start, ev.rrule ?? null, horizon, now)) {
        const key = `${occ.y}${String(occ.mo).padStart(2, "0")}${String(occ.d).padStart(2, "0")}`;
        if (ev.exdates.has(key)) continue;
        const ms = rawToMs(occ);
        // Keep all-day events through the end of their day.
        if (ms < now - (ev.isAllDay ? 12 * 3600000 : 0)) continue;
        if (ms > horizon) continue;
        const dedupe = `${ev.title}@${ms}`;
        if (seen.has(dedupe)) continue;
        seen.add(dedupe);
        collected.push({
          title: ev.title,
          location: ev.location ?? null,
          isAllDay: ev.isAllDay ?? false,
          startMs: ms,
        });
      }
    }
  }

  collected.sort((a, b) => a.startMs - b.startMs);

  return collected.slice(0, limit).map((e, i) => {
    const d = new Date(e.startMs);
    return {
      id: `${e.startMs}-${i}`,
      title: e.title,
      location: e.location,
      isAllDay: e.isAllDay,
      startMs: e.startMs,
      monthLabel: monthFmt.format(d).toUpperCase(),
      dayLabel: dayFmt.format(d),
      weekdayLabel: weekdayFmt.format(d),
      timeLabel: e.isAllDay ? null : timeFmt.format(d),
    };
  });
}
