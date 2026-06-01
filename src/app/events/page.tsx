import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";
import { pageContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming services, ministry nights, and church calendar information.",
};

export default function EventsPage() {
  return <StandardPage {...pageContent.events} />;
}
