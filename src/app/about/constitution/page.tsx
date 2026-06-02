import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { constitution } from "@/lib/constitution";

export const metadata: Metadata = {
  title: "Church Constitution",
  description:
    "The constitution and statement of belief of Faith Bible Church, Sprakers, New York.",
};

type Block = { tag: "h2" | "h3" | "p"; text: string };

// Classify each paragraph of the verbatim text into a heading or body block.
function classify(text: string): Block {
  const t = text.trim();
  if (t === "PREAMBLE" || /^ARTICLE\s+[IVXLC]+\b/.test(t)) return { tag: "h2", text: t };
  if (/^SECTION\b/i.test(t)) return { tag: "h3", text: t };
  // Numbered, all-caps headings like "1. ATTENDANCE"
  if (/^\d+\.\s+[A-Z][A-Z'’ .&-]+$/.test(t)) return { tag: "h3", text: t };
  // Short all-caps headings like "WHAT WE EXPECT OF OUR MEMBERS"
  if (/^[A-Z][A-Z'’ .&-]{3,}$/.test(t) && t.length < 60) return { tag: "h3", text: t };
  return { tag: "p", text: t };
}

const blocks: Block[] = constitution
  .split(/\n{2,}/)
  .map((b) => b.replace(/\s*\n\s*/g, " ").trim())
  .filter(Boolean)
  .map(classify);

export default function ConstitutionPage() {
  return (
    <>
      <PageHero
        eyebrow="About Faith Bible"
        title="Church Constitution"
        intro="The constitution and statement of belief by which Faith Bible Church orders its life and ministry."
      />
      <section className="legal-doc">
        <article className="legal-body">
          {blocks.map((b, i) => {
            if (b.tag === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.tag === "h3") return <h3 key={i}>{b.text}</h3>;
            return <p key={i}>{b.text}</p>;
          })}
        </article>
      </section>
    </>
  );
}
