import { createFileRoute } from "@tanstack/react-router";
import { NBButton, NBCard, SectionHeader, Tape, Prose } from "@/components/nb";
import { pageByNum, hero, section, seo, field } from "@/data/site";

export const Route = createFileRoute("/book")({
  head: () => {
    const p = pageByNum(5);
    const m = seo(p);
    return {
      meta: [
        { title: m.title ?? "Book a Consultation — Infinite Retina" },
        { name: "description", content: m.description ?? "Book a free consultation with Infinite Retina." },
      ],
    };
  },
  component: BookPage,
});

function BookPage() {
  const p = pageByNum(5);
  const h = hero(p)!;
  const what = section(p, "WHAT TO EXPECT");
  const reassurance = section(p, "REASSURANCE");
  const nextSteps = section(p, "WHAT HAPPENS NEXT");
  return (
    <div>
      <section className="bg-brand-pink text-white border-b-[3px] border-brand-ink">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-24 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Tape className="mb-6">Book a Call</Tape>
            <h1 className="font-display uppercase text-5xl md:text-7xl leading-[0.9]">
              {h.headline}
            </h1>
            <p className="mt-6 text-xl md:text-2xl">{h.subheadline}</p>
            <p className="mt-4 opacity-90 max-w-2xl">{h.supporting}</p>
          </div>
          <div className="md:col-span-5">
            <div className="nb-border nb-shadow-lg bg-background text-brand-ink p-6">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {what && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Tape className="mb-4">What To Expect</Tape>
            <h2 className="font-display uppercase text-3xl md:text-5xl leading-[0.9]">
              {field(what.body, "Headline") ?? "The 30-Minute Conversation"}
            </h2>
          </div>
          <div className="md:col-span-7">
            <Prose body={what.body.replace(/^[\s\S]*?Body:\s*/, "")} />
          </div>
        </section>
      )}

      {nextSteps && (
        <section className="bg-brand-yellow border-y-[3px] border-brand-ink">
          <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
            <SectionHeader label="What Happens Next" title={field(nextSteps.body, "Headline") ?? "After You Submit"} />
            <NBCard tint="card" className="p-6">
              <Prose body={nextSteps.body.replace(/^[\s\S]*?Body:\s*/, "")} />
            </NBCard>
          </div>
        </section>
      )}

      {reassurance && (
        <section className="mx-auto max-w-4xl px-4 md:px-8 py-16">
          <SectionHeader label="Reassurance" title={field(reassurance.body, "Headline") ?? "You're in Good Hands"} />
          <Prose body={reassurance.body.replace(/^[\s\S]*?Body:\s*/, "")} />
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
        <div className="nb-border nb-shadow-lg bg-brand-ink text-brand-yellow p-10 md:p-16 text-center">
          <h2 className="font-display uppercase text-3xl md:text-5xl">Prefer email?</h2>
          <p className="mt-4 text-lg text-brand-yellow/80">hello@infiniteretina.com</p>
          <div className="mt-6 inline-block">
            <NBButton to="/contact" variant="secondary" size="lg">Send a message →</NBButton>
          </div>
        </div>
      </section>
    </div>
  );
}

function BookingForm() {
  const fields: { name: string; label: string; type?: string; textarea?: boolean }[] = [
    { name: "name", label: "Full Name" },
    { name: "email", label: "Business Email", type: "email" },
    { name: "company", label: "Company" },
    { name: "role", label: "Your Role" },
  ];
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Received. A partner will be in touch within one business day.");
        (e.target as HTMLFormElement).reset();
      }}
      className="grid gap-4"
    >
      <div className="font-display uppercase text-2xl">Request a Call</div>
      {fields.map((f) => (
        <label key={f.name} className="grid gap-1">
          <span className="font-mono text-xs uppercase font-bold">{f.label}</span>
          <input
            required
            name={f.name}
            type={f.type ?? "text"}
            className="nb-border bg-background px-3 py-2 font-mono"
          />
        </label>
      ))}
      <label className="grid gap-1">
        <span className="font-mono text-xs uppercase font-bold">Which practice?</span>
        <select name="practice" className="nb-border bg-background px-3 py-2 font-mono">
          {["Not sure yet", "Funding", "Customers", "Attention", "Infrastructure & Operations", "Culture", "Talent", "Legal"].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1">
        <span className="font-mono text-xs uppercase font-bold">Briefly describe the challenge</span>
        <textarea name="challenge" rows={4} className="nb-border bg-background px-3 py-2 font-mono" />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center px-5 py-3 bg-brand-ink text-brand-yellow nb-border nb-shadow nb-press font-display uppercase"
      >
        Request Consultation →
      </button>
    </form>
  );
}