import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 301 redirects from the old Wix site URLs to the new pages, so bookmarks and
// Google's indexed links keep working (and pass their ranking) once this site
// goes live at fbcministriesny.org. true 301 (not 308) per request.
// (Next 16 renamed the "middleware" convention to "proxy".)
const REDIRECTS: Record<string, string> = {
  "/fbc-constitution": "/about/constitution",
  "/fbc-missions": "/missions",
  "/men-ministries": "/ministries/men",
  "/copy-of-men-ministries": "/ministries/women",
  "/copy-of-women-s-ministry": "/ministries/adults",
  "/copy-of-women-s-ministry-1": "/ministries/teens",
  "/copy-of-teen-s-ministry": "/ministries/kids",
  "/need-counseling": "/counseling",
  "/copy-of-gospel": "/about",
  "/gospel": "/about",
  "/events-page": "/events",
  "/copy-of-fbc-calendar": "/events",
  "/fbc-calendar": "/events",
  "/watch-online": "/sermons",
  "/prayer-groups": "/ministries",
  "/copy-of-church-information": "/contact",
  "/church-information": "/contact",
};

export function proxy(req: NextRequest) {
  // Normalize a trailing slash so "/gospel/" matches "/gospel".
  const path = req.nextUrl.pathname.replace(/\/+$/, "") || "/";
  const destination = REDIRECTS[path];
  if (destination) {
    const url = req.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/fbc-constitution",
    "/fbc-missions",
    "/men-ministries",
    "/copy-of-men-ministries",
    "/copy-of-women-s-ministry",
    "/copy-of-women-s-ministry-1",
    "/copy-of-teen-s-ministry",
    "/need-counseling",
    "/copy-of-gospel",
    "/gospel",
    "/events-page",
    "/copy-of-fbc-calendar",
    "/fbc-calendar",
    "/watch-online",
    "/prayer-groups",
    "/copy-of-church-information",
    "/church-information",
  ],
};
