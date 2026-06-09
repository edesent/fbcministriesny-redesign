"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The web-chat widget only belongs on the homepage. The third-party script
// injects fixed-position elements into <body> (ids prefixed `wbc-`), so rather
// than tearing those down on every navigation we flag the route on <body> and
// let CSS hide the widget everywhere except "/". (See globals.css.)
export default function ChatWidget() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.dataset.chatHidden = pathname === "/" ? "false" : "true";
  }, [pathname]);

  return (
    <Script
      src="https://slackwebsitechat.vercel.app/widget/wbc-chat.js"
      data-api="https://slackwebsitechat.vercel.app"
      data-key="wbc_cfbaa539e1ca0e7692f5e02f43c5cd78ca140ca5abc8b32b"
      strategy="afterInteractive"
    />
  );
}
