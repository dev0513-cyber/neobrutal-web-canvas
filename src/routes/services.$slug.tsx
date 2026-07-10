import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NBButton, NBCard, SectionHeader, Tape } from "@/components/nb";
import { PageRenderer } from "@/components/content-page";
import { pageByNum, serviceBySlug, seo, type Practice, type ServiceRef } from "@/data/site";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const match = serviceBySlug(params.slug);
    if (!match) return { meta: [{ title: "Service — Infinite Retina" }] };
    const p = pageByNum(match.service.page);
    const m = seo(p);
    return {
      meta: [
        { title: m.title ?? `${match.service.label} — Infinite Retina` },
        { name: "description", content: m.description ?? `${match.service.label} consulting from Infinite Retina.` },
        { property: "og:title", content: m.title ?? `${match.service.label} — Infinite Retina` },
        { property: "og:description", content: m.description ?? "" },
      ],
    };
  },
  loader: ({ params }): { practice: Practice; service: ServiceRef } => {
    const match = serviceBySlug(params.slug);
    if (!match) throw notFound();
    return match;
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display uppercase text-4xl">Service Not Found</h1>
      <Link to="/services" className="mt-6 inline-block underline">Back to services</Link>
    </div>
  ),
});

function ServiceDetail() {
  const { practice, service } = Route.useLoaderData();
  const page = pageByNum(service.page);
  const siblings = practice.services.filter((s: ServiceRef) => s.slug !== service.slug);
  return (
    <div>
      <PageRenderer
        page={page}
        accent={practice.color}
        breadcrumb={
          <>
            <Link to="/services" className="underline">Services</Link> /{" "}
            <Link to="/practices/$slug" params={{ slug: practice.slug }} className="underline">
              {practice.label}
            </Link>{" "}
            / {service.label}
          </>
        }
      />
      {siblings.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 border-t-[3px] border-brand-ink">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <Tape className="mb-2">More in {practice.label}</Tape>
              <h2 className="font-display uppercase text-3xl md:text-5xl">Related Services</h2>
            </div>
            <NBButton to="/practices/$slug" variant="outline">
              Practice Overview →
            </NBButton>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {siblings.map((svc: ServiceRef) => (
              <Link key={svc.slug} to="/services/$slug" params={{ slug: svc.slug }} className="nb-press">
                <NBCard className="p-5 h-full flex flex-col">
                  <div className="font-mono text-xs uppercase mb-2">{practice.label}</div>
                  <h3 className="font-display uppercase text-xl">{svc.label}</h3>
                  <div className="mt-auto pt-6 font-display uppercase text-sm">View →</div>
                </NBCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}