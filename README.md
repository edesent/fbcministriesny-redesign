# Faith Bible Church Redesign

A complete Next.js redesign concept for Faith Bible Church in Sprakers, NY.

## Commands

```bash
npm install
npm run dev
npm run build
```

The site uses the original church logo and source photography from the current public website.

## Editing the site

Almost all editable content lives in **`src/lib/site.ts`** (church info, service times,
ministries, missionaries, and the menu). After any edit, **commit/save the change** —
the site rebuilds and goes live automatically in about 30 seconds.

### The top menu (navigation)

The menu is the **`navItems`** list in `src/lib/site.ts`. Each line is one menu item:

```ts
export const navItems: NavItem[] = [
  { label: "Times", href: "/#times" },
  { label: "Ministries", href: "/ministries" },
  { label: "Sermons", href: "/sermons" },
  // ...
];
```

**To add a menu link**, add one new line to that list, for example:

```ts
  { label: "Academy", href: "https://your-academy-website.com" }, // an outside website
  { label: "Academy", href: "/about" },                           // a page already on this site
```

- `label` = the words shown in the menu.
- `href` = where it goes. An **outside website** starts with `https://`. A **page already on
  this site** starts with `/` — the existing pages are: `/`, `/about`, `/about/constitution`,
  `/ministries`, `/sermons`, `/missions`, `/events`, `/counseling`, `/give`, `/contact`.
- Don't invent a page path that doesn't exist (e.g. `/academy`) unless that page has been
  created first — it will 404. Link to an existing page or an outside website instead.
- The new item automatically appears in both the desktop menu and the mobile (hamburger) menu.

**Remember to commit the change** — if it isn't committed, nothing happens on the live site.
