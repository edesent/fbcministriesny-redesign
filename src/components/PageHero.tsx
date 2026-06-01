import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
};

export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="page-hero">
      <Image src="/mountains.jpg" alt="" fill preload sizes="100vw" />
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}
