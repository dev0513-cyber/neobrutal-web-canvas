import { createFileRoute, Link } from "@tanstack/react-router";
import { NBButton, NBCard, SectionHeader, Tape, Prose } from "@/components/nb";
import { pageByNum, hero, section, labeledList, practices } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infinite Retina — Consulting that translates ambition into outcomes" },
      {
        name: "description",
        content:
          "Seven disciplines. One integrated practice. Consulting across funding, customers, attention, operations, culture, talent, and legal for growing organisations.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const page = pageByNum(1);
  const h = hero(page)!;
  const overview = section(page, "OVERVIEW")!;
  const detailed = section(page, "DETAILED EXPLANATION")!;
  const benefits = labeledList(section(page, "BENEFITS")!.body, "Benefit", ["Name", "Body"]);
  const problems = section(page, "PROBLEMS SOLVED")!
    .body.split(/\n\s*\n/)
    .filter((l) => /^Problem \d+:/.test(l))
    .map((l) => l.replace(/^Problem \d+:\s*/, ""));

  return (
    <div>
      <section className="relative overflow-hidden border-b-[3px] border-brand-ink">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <Tape className="mb-6">Est. Consulting Practice</Tape>
            <h1 className="font-display uppercase text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
              {h.headline}
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl">{h.subheadline}</p>
            <p className="mt-4 text-base md:text-lg max-w-3xl text-muted-foreground">{h.supporting}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <NBButton to="/book" size="lg">{h.primaryCta} →</NBButton>
              <NBButton to="/services" size="lg" variant="outline">{h.secondaryCta}</NBButton>
            </div>
          </div>
          <div className="md:col-span-4 relative hidden md:block">
            <div className="relative h-[380px]">
              <div className="absolute right-8 top-0 h-40 w-40 bg-brand-pink nb-border nb-shadow rotate-6" />
              <div className="absolute right-32 top-24 h-48 w-48 bg-brand-cyan nb-border nb-shadow -rotate-3" />
              <div className="absolute right-0 bottom-0 h-56 w-56 bg-brand-yellow nb-border nb-shadow rotate-2 flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="font-display uppercase text-2xl">7 Practices</div>
                  <div className="mt-1 font-mono text-sm">One integrated firm</div>
                </div>
              </div>
              <div className="absolute left-0 bottom-16 h-24 w-40 bg-brand-lime nb-border nb-shadow -rotate-6 flex items-center justify-center">
                <span className="font-display uppercase text-sm">Diagnosis First</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <SectionHeader
          label="What We Do"
          title="Seven Disciplines. One Integrated Practice."
          kicker="Our practice areas are a coherent system designed to move an organisation from its current position to its next level of performance."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {practices.map((p, i) => {
            const tint = (["yellow", "pink", "cyan", "lime", "pink", "yellow", "cyan"] as const)[i];
            return (
              <Link key={p.slug} to="/practices/$slug" params={{ slug: p.slug }} className="nb-press">
                <NBCard className="p-6 h-full flex flex-col" tint={tint}>
                  <div className="font-mono text-xs uppercase mb-3">0{i + 1} / Practice</div>
                  <h3 className="font-display uppercase text-2xl md:text-3xl">{p.label}</h3>
                  <p className="mt-3 text-sm md:text-base flex-1">{p.tagline}</p>
                  <div className="mt-6 font-display uppercase text-sm">Explore →</div>
                </NBCard>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-ink text-brand-yellow border-y-[3px] border-brand-ink">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Tape className="mb-6">Our Approach</Tape>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9]">
              Strategy Without Execution Is Opinion.
            </h2>
            <p className="mt-4 text-xl text-brand-yellow/80">
              Execution without strategy is expensive.
            </p>
          </div>
          <div className="md:col-span-7 text-brand-yellow/90">
            <Prose body={detailed.body.replace(/^[\s\S]*?Body:\s*/, "")} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <SectionHeader label="Why Clients Engage Us" title="Six Reasons Clients Return." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <NBCard key={i} className="p-6" tint="card">
              <div className="font-mono text-xs mb-2">0{i + 1}</div>
              <h3 className="font-display uppercase text-xl">{b.name}</h3>
              <p className="mt-3 text-base">{b.body}</p>
            </NBCard>
          ))}
        </div>
      </section>

      <section className="bg-brand-yellow border-y-[3px] border-brand-ink">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <SectionHeader label="The Challenges We Resolve" title="If Any of These Describe Your Business, We Should Talk." />
          <ol className="grid gap-4 md:grid-cols-2">
            {problems.map((p, i) => (
              <li key={i} className="flex gap-4 nb-border bg-background p-5 nb-shadow-sm">
                <span className="font-display text-2xl md:text-3xl text-brand-pink shrink-0">0{i + 1}</span>
                <p className="text-base leading-relaxed">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-24">
        <div className="nb-border nb-shadow-lg bg-brand-pink text-white p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 h-40 w-40 bg-brand-yellow nb-border rotate-12" />
          <div className="relative">
            <Tape className="mb-6">Next Step</Tape>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9] max-w-3xl">
              Begin with a conversation. We'll tell you honestly whether we can help.
            </h2>
            <div className="mt-8 flex flex-wrap gap-4">
              <NBButton to="/book" size="lg" variant="secondary">Book a Free Consultation →</NBButton>
              <NBButton to="/services" size="lg" variant="outline">Explore Services</NBButton>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 md:px-8 pb-24">
        <SectionHeader label="Overview" title="Our Practice, In One Paragraph." />
        <Prose body={overview.body.replace(/^[\s\S]*?Body:\s*/, "").split(/\n\nService Category/)[0]} />
      </section>
    </div>
  );
}