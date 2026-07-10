import { createFileRoute } from "@tanstack/react-router";
import { PageRenderer } from "@/components/content-page";
import { pageByNum, seo } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => {
    const p = pageByNum(4);
    const m = seo(p);
    return {
      meta: [
        { title: m.title ?? "Contact — Infinite Retina" },
        { name: "description", content: m.description ?? "Get in touch with the Infinite Retina consulting team." },
      ],
    };
  },
  component: () => (
    <div>
      <PageRenderer page={pageByNum(4)} accent="lime" />
      <ContactForm />
    </div>
  ),
});

function ContactForm() {
  return (
    <section className="mx-auto max-w-3xl px-4 md:px-8 py-20">
      <div className="nb-border nb-shadow-lg bg-card p-8 md:p-10">
        <h2 className="font-display uppercase text-3xl md:text-4xl">Send Us A Note</h2>
        <p className="mt-2 text-muted-foreground">
          Every message reaches a partner. Expect a reply within two business days.
        </p>
        <form
          className="mt-8 grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks — we'll be in touch shortly.");
            (e.target as HTMLFormElement).reset();
          }}
        >
          {[
            { name: "name", label: "Your name", type: "text" },
            { name: "email", label: "Email address", type: "email" },
            { name: "company", label: "Company", type: "text" },
          ].map((f) => (
            <label key={f.name} className="grid gap-2">
              <span className="font-mono text-xs uppercase font-bold">{f.label}</span>
              <input
                required
                type={f.type}
                name={f.name}
                className="nb-border bg-background px-4 py-3 font-mono focus:outline-none focus:ring-0 focus:nb-shadow-sm"
              />
            </label>
          ))}
          <label className="grid gap-2">
            <span className="font-mono text-xs uppercase font-bold">What can we help with?</span>
            <textarea
              required
              name="message"
              rows={5}
              className="nb-border bg-background px-4 py-3 font-mono focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-4 bg-brand-ink text-brand-yellow nb-border nb-shadow nb-press font-display uppercase text-lg"
          >
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
}