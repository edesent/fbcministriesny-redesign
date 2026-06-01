import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";
import { pageContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ministries",
  description: "Discover ministries for men, women, adults, teens, and children at Faith Bible Church.",
};

export default function MinistriesPage() {
  return <StandardPage {...pageContent.ministries} />;
}
