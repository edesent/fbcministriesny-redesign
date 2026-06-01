import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";
import { pageContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Missions",
  description: "Missions and gospel outreach at Faith Bible Church.",
};

export default function MissionsPage() {
  return <StandardPage {...pageContent.missions} />;
}
