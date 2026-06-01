import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";
import { pageContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give",
  description: "Giving and stewardship information for Faith Bible Church.",
};

export default function GivePage() {
  return <StandardPage {...pageContent.give} />;
}
