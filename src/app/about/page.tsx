import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";
import { pageContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Faith Bible Church in Sprakers, New York.",
};

export default function AboutPage() {
  return <StandardPage {...pageContent.about} />;
}
