import { NBButton, NBCard, Prose, SectionHeader, Tape } from "@/components/nb";
import type { Page, Section } from "@/data/site";
import { field, hero } from "@/data/site";

/**
 * Render a Page from parsed content. Recognises HERO, OVERVIEW,
 * DETAILED EXPLANATION, BENEFITS, PROBLEMS SOLVED, WHY CHOOSE US,
 * PROCESS, DELIVERABLES, INDUSTRIES, CASE STUDY, CTA BANNER, FAQ,
 * MISSION AND VALUES, and generic fall-through sections.
 */
export function PageRenderer({
  page,
  accent = "yellow",
  breadcrumb,
}: {
  page: Page;
  accent?: "yellow" | "pink" | "cyan" | "lime";
  breadcrumb?: React.ReactNode;
}) {
  const h = hero(page);
  const rest = page.sections.filter(
    (s) => !["HERO", "META AND SEO DATA"].includes(s.name),
  );
  return (
    <div>
      {h && <HeroSection page={page} accent={accent} breadcrumb={breadcrumb} />}
      {rest.map((s, i) => (
        <SectionRenderer key={i} section={s} index={i} accent={accent} />
      ))}
    </div>
  );
}

const accentBg: Record<string, string> = {
  yellow: "bg-brand-yellow",
  pink: "bg-brand-pink text-white",
  cyan: "bg-brand-cyan",
  lime: "bg-brand-lime",
};

function HeroSection({
  page,
  accent,
  breadcrumb,
}: {
  page: Page;
  accent: string;
  breadcrumb?: React.ReactNode;
}) {
  const h = hero(page)!;
  return (
    <section className={`border-b-[3px] border-brand-ink ${accentBg[accent]}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-24">
        {breadcrumb && <div className="mb-6 font-mono text-xs uppercase">{breadcrumb}</div>}
        <Tape className="mb-6">Page {page.num.toString().padStart(2, "0")} / {page.title}</Tape>
        <h1 className="font-display uppercase text-4xl md:text-6xl lg:text-7xl leading-[0.9] max-w-5xl">
          {h.headline}
        </h1>
        {h.subheadline && <p className="mt-6 text-lg md:text-2xl max-w-4xl">{h.subheadline}</p>}
        {h.supporting && (
          <p className="mt-4 text-base md:text-lg max-w-3xl opacity-90">{h.supporting}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <NBButton to="/book" size="lg" variant="primary">
            {h.primaryCta} →
          </NBButton>
          <NBButton to="/services" size="lg" variant="outline">
            {h.secondaryCta}
          </NBButton>
        </div>
      </div>
    </section>
  );
}

function SectionRenderer({
  section: s,
  index,
  accent,
}: {
  section: Section;
  index: number;
  accent: string;
}) {
  const label = field(s.body, "Section Label");
  const headline = field(s.body, "Headline");
  const body = field(s.body, "Body");
  const alt = index % 2 === 0;

  if (s.name === "FAQ" || s.name === "FAQ CONTENT") {
    const qs = extractQAs(s.body);
    return (
      <section className="mx-auto max-w-4xl px-4 md:px-8 py-16">
        <SectionHeader label="FAQ" title={headline ?? "Frequently Asked Questions"} />
        <div className="space-y-4">
          {qs.map((q, i) => (
            <details key={i} className="nb-border bg-card p-5 group nb-shadow-sm">
              <summary className="font-display uppercase text-lg cursor-pointer flex justify-between gap-4">
                <span>{q.q}</span>
                <span className="text-brand-pink group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-base leading-relaxed">{q.a}</p>
            </details>
          ))}
        </div>
      </section>
    );
  }

  if (s.name === "BENEFITS" || s.name === "MISSION AND VALUES" || s.name === "WHY CHOOSE US") {
    const singular = s.name === "MISSION AND VALUES" ? "Value" : s.name === "WHY CHOOSE US" ? "Differentiator" : "Benefit";
    const items = extractLabeledPairs(s.body, singular);
    return (
      <section className={`${alt ? "bg-background" : "bg-muted"} border-y-[3px] border-brand-ink`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
          <SectionHeader label={label ?? s.name} title={headline ?? ""} kicker={body} />
          {items.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((it, i) => (
                <NBCard key={i} className="p-6" tint="card">
                  <div className="font-mono text-xs mb-2 text-brand-pink">0{i + 1}</div>
                  <h3 className="font-display uppercase text-xl">{it.name}</h3>
                  <p className="mt-3 text-base">{it.body}</p>
                </NBCard>
              ))}
            </div>
          ) : (
            <Prose body={s.body} />
          )}
        </div>
      </section>
    );
  }

  if (s.name === "PROBLEMS SOLVED") {
    const items = s.body
      .split(/\n\s*\n/)
      .filter((l) => /^Problem \d+:/.test(l))
      .map((l) => l.replace(/^Problem \d+:\s*/, ""));
    return (
      <section className="bg-brand-yellow border-y-[3px] border-brand-ink">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
          <SectionHeader label={label ?? "Problems Solved"} title={headline ?? "Problems We Resolve"} />
          <ol className="grid gap-4 md:grid-cols-2">
            {items.map((p, i) => (
              <li key={i} className="flex gap-4 nb-border bg-background p-5 nb-shadow-sm">
                <span className="font-display text-2xl md:text-3xl text-brand-pink shrink-0">0{i + 1}</span>
                <p className="text-base leading-relaxed">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  if (s.name === "PROCESS") {
    const steps = extractSteps(s.body);
    return (
      <section className="bg-brand-ink text-brand-yellow border-y-[3px] border-brand-ink">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-16">
          <div className="mb-10">
            <Tape className="mb-4">{label ?? "Process"}</Tape>
            <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.9] max-w-4xl">
              {headline ?? "How We Work"}
            </h2>
            {body && <p className="mt-4 text-lg text-brand-yellow/80 max-w-3xl">{body}</p>}
          </div>
          {steps.length > 0 ? (
            <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((st, i) => (
                <li key={i} className="nb-border bg-brand-yellow text-brand-ink p-6 nb-shadow-sm">
                  <div className="font-mono text-xs uppercase mb-1">Step {i + 1}</div>
                  <h3 className="font-display uppercase text-xl">{st.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{st.body}</p>
                </li>
              ))}
            </ol>
          ) : (
            <Prose body={s.body} className="text-brand-yellow/90" />
          )}
        </div>
      </section>
    );
  }

  if (s.name === "CTA BANNER") {
    return (
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="nb-border nb-shadow-lg bg-brand-pink text-white p-10 md:p-16">
          <Tape className="mb-6">Next Step</Tape>
          <h2 className="font-display uppercase text-3xl md:text-5xl leading-[0.9] max-w-3xl">
            {headline ?? "Begin With a Conversation"}
          </h2>
          {body && <p className="mt-6 text-lg max-w-2xl opacity-95">{body}</p>}
          <div className="mt-8">
            <NBButton to="/book" size="lg" variant="secondary">
              {field(s.body, "Primary CTA") ?? "Book a Free Consultation"} →
            </NBButton>
          </div>
        </div>
      </section>
    );
  }

  // Generic renderer for OVERVIEW / DETAILED EXPLANATION / DELIVERABLES / INDUSTRIES / CASE STUDY / etc.
  const tintOptions = ["card", "yellow", "cyan", "lime"] as const;
  const isDark = s.name === "DETAILED EXPLANATION";
  return (
    <section
      className={
        isDark
          ? "bg-brand-ink text-brand-yellow border-y-[3px] border-brand-ink"
          : alt
          ? "bg-background"
          : "bg-muted border-y-[3px] border-brand-ink"
      }
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Tape className="mb-4">{label ?? s.name.toLowerCase().replace(/_/g, " ")}</Tape>
          <h2 className="font-display uppercase text-3xl md:text-5xl leading-[0.9]">
            {headline ?? s.name}
          </h2>
        </div>
        <div className="md:col-span-7">
          <Prose
            body={
              body ??
              s.body
                .replace(/^Section Label:.*\n/i, "")
                .replace(/^Headline:.*\n/i, "")
                .replace(/^Body:\s*/i, "")
            }
            className={isDark ? "text-brand-yellow/90" : ""}
          />
          {/* Extra decorative tag */}
          <div className="mt-6">
            <span className={`nb-tape ${tintOptions[index % 4] === "card" ? "" : ""}`}>
              {s.name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function extractQAs(body: string): { q: string; a: string }[] {
  const lines = body.split("\n");
  const items: { q: string; a: string }[] = [];
  let cur: { q: string; a: string } | null = null;
  for (const raw of lines) {
    const line = raw;
    const q = line.match(/^Question\s*\d+:\s*(.*)$/i);
    const a = line.match(/^Answer\s*\d+:\s*(.*)$/i);
    if (q) {
      if (cur) items.push(cur);
      cur = { q: q[1].trim(), a: "" };
    } else if (a && cur) {
      cur.a = a[1].trim();
    } else if (cur && line.trim() && !cur.a) {
      // extension of question
    } else if (cur && line.trim()) {
      cur.a += (cur.a ? " " : "") + line.trim();
    }
  }
  if (cur) items.push(cur);
  return items.filter((x) => x.q && x.a);
}

function extractLabeledPairs(body: string, singular: string) {
  const items: { name: string; body: string }[] = [];
  for (let i = 1; i < 40; i++) {
    const nameRe = new RegExp(`${singular}\\s*${i}\\s*Name:\\s*(.+)`, "i");
    const bodyRe = new RegExp(
      `${singular}\\s*${i}\\s*Body:\\s*((?:.|\\n)*?)(?=\\n\\s*${singular}\\s*${i + 1}\\s*Name:|$)`,
      "i",
    );
    const nm = body.match(nameRe);
    const bd = body.match(bodyRe);
    if (!nm) break;
    items.push({ name: nm[1].trim(), body: (bd?.[1] ?? "").trim() });
  }
  return items;
}

function extractSteps(body: string) {
  const steps: { title: string; body: string }[] = [];
  for (let i = 1; i < 20; i++) {
    const nm = body.match(new RegExp(`Step\\s*${i}\\s*(?:Name|Title):\\s*(.+)`, "i"));
    const bd = body.match(
      new RegExp(
        `Step\\s*${i}\\s*(?:Body|Description):\\s*((?:.|\\n)*?)(?=\\n\\s*Step\\s*${i + 1}|$)`,
        "i",
      ),
    );
    if (!nm) {
      // try Phase pattern
      const pnm = body.match(new RegExp(`Phase\\s*${i}\\s*(?:Name|Title):\\s*(.+)`, "i"));
      const pbd = body.match(
        new RegExp(
          `Phase\\s*${i}\\s*(?:Body|Description):\\s*((?:.|\\n)*?)(?=\\n\\s*Phase\\s*${i + 1}|$)`,
          "i",
        ),
      );
      if (!pnm) break;
      steps.push({ title: pnm[1].trim(), body: (pbd?.[1] ?? "").trim() });
      continue;
    }
    steps.push({ title: nm[1].trim(), body: (bd?.[1] ?? "").trim() });
  }
  return steps;
}