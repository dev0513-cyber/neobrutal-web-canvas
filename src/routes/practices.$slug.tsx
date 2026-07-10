import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NBCard, SectionHeader, Tape } from "@/components/nb";
import { PageRenderer } from "@/components/content-page";
import { pageByNum, practiceBySlug, seo, type Practice, type ServiceRef } from "@/data/site";

export const Route = createFileRoute("/practices/$slug")({
  head: ({ params }) => {
    const practice = practiceBySlug(params.slug);
    if (!practice) return { meta: [{ title: "Practice — Infinite Retina" }] };
    const p = pageByNum(practice.page);
    const m = seo(p);
    return {
      meta: [
        { title: m.title ?? `${practice.label} — Infinite Retina` },
        { name: "description", content: m.description ?? practice.tagline },
        { property: "og:title", content: m.title ?? `${practice.label} — Infinite Retina` },
        { property: "og:description", content: m.description ?? practice.tagline },
      ],
    };
  },
  loader: ({ params }): { practice: Practice } => {
    const practice = practiceBySlug(params.slug);
    if (!practice) throw notFound();
    return { practice };
  },
  component: PracticePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display uppercase text-4xl">Practice Not Found</h1>
      <Link to="/services" className="mt-6 inline-block underline">Back to services</Link>
    </div>
  ),
});

function PracticePage() {
  const { practice } = Route.useLoaderData();
  const page = pageByNum(practice.page);
  return (
    <div>
      <PageRenderer
        page={page}
        accent={practice.color}
        breadcrumb={
          <>
            <Link to="/services" className="underline">Services</Link> / {practice.label}
          </>
        }
      />
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 border-t-[3px] border-brand-ink">
        <SectionHeader label="This Practice" title={`${practice.services.length} Services in ${practice.label}`} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {practice.services.map((svc: ServiceRef, i: number) => (
            <Link key={svc.slug} to="/services/$slug" params={{ slug: svc.slug }} className="nb-press">
              <NBCard className="p-5 h-full flex flex-col">
                <Tape className="mb-2">Service 0{i + 1}</Tape>
                <h3 className="font-display uppercase text-xl">{svc.label}</h3>
                <div className="mt-auto pt-6 font-display uppercase text-sm">View →</div>
              </NBCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}