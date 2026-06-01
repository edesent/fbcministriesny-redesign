import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";
import { pageContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Counseling",
  description: "Biblical counseling information from Faith Bible Church.",
};

export default function CounselingPage() {
  return <StandardPage {...pageContent.counseling} />;
}
