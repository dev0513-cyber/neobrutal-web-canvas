import { createFileRoute, Link } from "@tanstack/react-router";
import { NBButton, NBCard, SectionHeader, Tape, Prose } from "@/components/nb";
import { pageByNum, hero, section, practices, seo } from "@/data/site";

export const Route = createFileRoute("/services")({
  head: () => {
    const p = pageByNum(3);
    const m = seo(p);
    return {
      meta: [
        { title: m.title ?? "Services — Infinite Retina" },
        {
          name: "description",
          content: m.description ?? "Seven practices, over 30 specialist services — the full architecture of a well-functioning business.",
        },
      ],
    };
  },
  component: ServicesOverview,
});

function ServicesOverview() {
  const page = pageByNum(3);
  const h = hero(page)!;
  const overview = section(page, "OVERVIEW");
  return (
    <div>
      <section className="bg-brand-cyan border-b-[3px] border-brand-ink">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-24">
          <Tape className="mb-6">All Services</Tape>
          <h1 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] max-w-5xl">
            {h.headline}
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-4xl">{h.subheadline}</p>
          <p className="mt-4 max-w-3xl">{h.supporting}</p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <NBButton to="/book" size="lg">{h.primaryCta} →</NBButton>
            <NBButton to="/contact" size="lg" variant="outline">{h.secondaryCta}</NBButton>
          </div>
        </div>
      </section>

      {overview && (
        <section className="mx-auto max-w-4xl px-4 md:px-8 py-16">
          <SectionHeader label="Overview" title="A Coherent System, Not A Menu." />
          <Prose body={overview.body.replace(/^[\s\S]*?Body:\s*/, "").split(/\n\nService Category/)[0]} />
        </section>
      )}

      {practices.map((practice, pi) => (
        <section key={practice.slug} className={pi % 2 === 0 ? "bg-background" : "bg-muted border-y-[3px] border-brand-ink"}>
          <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
              <div>
                <div className="font-mono text-xs uppercase mb-2">
                  Practice 0{pi + 1} / {practice.services.length} services
                </div>
                <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9]">
                  {practice.label}
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{practice.tagline}</p>
              </div>
              <Link
                to="/practices/$slug"
                params={{ slug: practice.slug }}
                className="inline-flex items-center px-4 py-2 nb-border nb-shadow-sm nb-press font-display uppercase bg-brand-yellow"
              >
                Practice Overview →
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {practice.services.map((svc, i) => (
                <Link key={svc.slug} to="/services/$slug" params={{ slug: svc.slug }} className="nb-press">
                  <NBCard className="p-5 h-full flex flex-col">
                    <div className="font-mono text-xs mb-2">{pi + 1}.{i + 1}</div>
                    <h3 className="font-display uppercase text-xl">{svc.label}</h3>
                    <div className="mt-auto pt-6 font-display uppercase text-sm">View →</div>
                  </NBCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}