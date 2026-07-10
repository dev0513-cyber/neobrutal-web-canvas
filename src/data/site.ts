import pagesJson from "./pages.json";

export type Section = { name: string; body: string };
export type Page = { num: number; title: string; sections: Section[] };

export const pages = pagesJson as Page[];

export function pageByNum(num: number): Page {
  const p = pages.find((x) => x.num === num);
  if (!p) throw new Error(`Missing page ${num}`);
  return p;
}

export function section(p: Page, name: string): Section | undefined {
  return p.sections.find((s) => s.name === name);
}

/** Extract a "Label:\nvalue" field from a section body. Returns the value or undefined. */
export function field(body: string, label: string): string | undefined {
  const re = new RegExp(`^${label}:\\s*\\n?([^\\n][\\s\\S]*?)(?=\\n\\s*\\n[A-Z][A-Za-z0-9 ]{1,60}:|$)`, "m");
  const m = body.match(re);
  return m?.[1].trim();
}

/** Split a body into blocks separated by blank lines. */
export function paragraphs(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Extract every "Label N Name/Body/Description" list (e.g. "Benefit 1 Name", "Benefit 1 Body"). */
export function labeledList(
  body: string,
  singular: string,
  parts: readonly string[] = ["Name", "Body"],
): Array<Record<string, string>> {
  const items: Array<Record<string, string>> = [];
  for (let i = 1; i < 40; i++) {
    const item: Record<string, string> = {};
    let found = false;
    for (const p of parts) {
      const re = new RegExp(`${singular}\\s*${i}\\s*${p}:\\s*([^\\n]+(?:\\n(?![A-Z][A-Za-z0-9 ]{1,60}:)[^\\n]+)*)`, "i");
      const m = body.match(re);
      if (m) {
        item[p.toLowerCase()] = m[1].trim();
        found = true;
      }
    }
    if (!found) break;
    items.push(item);
  }
  return items;
}

/** Simple hero extractor for pages with SECTION: HERO. */
export function hero(p: Page) {
  const s = section(p, "HERO");
  if (!s) return null;
  return {
    headline: field(s.body, "Headline") ?? "",
    subheadline: field(s.body, "Subheadline") ?? "",
    supporting: field(s.body, "Supporting Copy") ?? "",
    primaryCta: field(s.body, "Primary CTA") ?? "Book a Free Consultation",
    secondaryCta: field(s.body, "Secondary CTA") ?? "Explore Our Services",
  };
}

/** Extract SEO metadata from META AND SEO DATA section if present. */
export function seo(p: Page): { title?: string; description?: string } {
  const s = section(p, "META AND SEO DATA");
  if (!s) return {};
  return {
    title: field(s.body, "Page Title"),
    description: field(s.body, "Meta Description"),
  };
}

/* ---- Taxonomy: 7 practices → services ---- */

export type ServiceRef = { slug: string; page: number; label: string };
export type Practice = {
  slug: string;
  label: string;
  page: number;
  color: PracticeColor;
  tagline: string;
  services: ServiceRef[];
};

export type PracticeColor = "yellow" | "pink" | "cyan" | "lime";

export const practices: Practice[] = [
  {
    slug: "funding",
    label: "Funding",
    page: 7,
    color: "yellow",
    tagline:
      "From funding strategy to investor pitch preparation and company valuation — we help you raise capital on the right terms.",
    services: [
      { slug: "funding-strategy", page: 8, label: "Funding Strategy" },
      { slug: "vc-connections", page: 9, label: "VC Connections" },
      { slug: "value-proposition-review", page: 10, label: "Value Proposition Review" },
      { slug: "deck-review", page: 11, label: "Deck Review" },
      { slug: "pitch-review", page: 12, label: "Pitch Review" },
      { slug: "company-valuation", page: 13, label: "Company Valuation" },
    ],
  },
  {
    slug: "customers",
    label: "Customers",
    page: 14,
    color: "pink",
    tagline:
      "From acquisition to retention, segmentation and product narrative — build a customer base that grows and stays.",
    services: [
      { slug: "customer-acquisition-strategy", page: 15, label: "Customer Acquisition Strategy" },
      { slug: "customer-retention-strategy", page: 16, label: "Customer Retention Strategy" },
      { slug: "market-segmentation-analysis", page: 17, label: "Market Segmentation Analysis" },
      { slug: "product-focus-narrative", page: 18, label: "Product Focus Narrative" },
    ],
  },
  {
    slug: "attention",
    label: "Attention",
    page: 19,
    color: "cyan",
    tagline:
      "From PR and media strategy to AR/VR experiences and speaker positioning — earn the visibility your business deserves.",
    services: [
      { slug: "ar-vr-experiences", page: 20, label: "AR and VR Experiences" },
      { slug: "pr-media-strategy", page: 21, label: "PR and Media Strategy" },
      { slug: "networking-strategy", page: 22, label: "Networking Strategy" },
      { slug: "conference-speaker-strategy", page: 23, label: "Conference and Speaker Strategy" },
    ],
  },
  {
    slug: "infrastructure-operations",
    label: "Infrastructure & Operations",
    page: 24,
    color: "lime",
    tagline:
      "From technology infrastructure to process management — build the operational foundation that supports growth.",
    services: [
      { slug: "infrastructure-strategy", page: 25, label: "Infrastructure Strategy" },
      { slug: "app-implementation", page: 26, label: "App Implementation" },
      { slug: "operations-strategy", page: 27, label: "Operations Strategy" },
      { slug: "management-consulting", page: 28, label: "Management Consulting" },
      { slug: "process-management", page: 29, label: "Process Management" },
    ],
  },
  {
    slug: "culture",
    label: "Culture",
    page: 30,
    color: "pink",
    tagline:
      "From culture coaching to inclusion and business process strategy — build an organisation that rewards high performance.",
    services: [
      { slug: "culture-coaching", page: 31, label: "Culture Coaching" },
      { slug: "inclusion-diversity", page: 32, label: "Inclusion & Diversity" },
      { slug: "business-process-strategy", page: 33, label: "Business Process Strategy" },
    ],
  },
  {
    slug: "talent",
    label: "Talent",
    page: 34,
    color: "yellow",
    tagline:
      "From needs assessment to hiring strategy and candidate matching — identify and select the people your growth requires.",
    services: [
      { slug: "needs-assessment", page: 35, label: "Needs Assessment" },
      { slug: "hiring-strategy", page: 36, label: "Hiring Strategy" },
      { slug: "candidate-matching", page: 37, label: "Candidate Matching" },
    ],
  },
  {
    slug: "legal",
    label: "Legal",
    page: 38,
    color: "cyan",
    tagline:
      "From business structure to fairness and equity — build on the correct legal and ethical foundation.",
    services: [
      { slug: "business-structure-strategy", page: 39, label: "Business Structure Strategy" },
      { slug: "fairness-equity-issues", page: 40, label: "Fairness & Equity Issues" },
    ],
  },
];

export function practiceBySlug(slug: string) {
  return practices.find((p) => p.slug === slug);
}

export function serviceBySlug(slug: string) {
  for (const p of practices) {
    const svc = p.services.find((s) => s.slug === slug);
    if (svc) return { practice: p, service: svc };
  }
  return null;
}

export const colorClasses = {
  yellow: {
    bg: "bg-brand-yellow",
    text: "text-brand-yellow",
    shadow: "nb-shadow",
  },
  pink: {
    bg: "bg-brand-pink",
    text: "text-brand-pink",
    shadow: "nb-shadow-pink",
  },
  cyan: {
    bg: "bg-brand-cyan",
    text: "text-brand-cyan",
    shadow: "nb-shadow-cyan",
  },
  lime: {
    bg: "bg-brand-lime",
    text: "text-brand-lime",
    shadow: "nb-shadow-lime",
  },
} as const;

export function allRoutes(): string[] {
  const out = ["/", "/about", "/services", "/contact", "/book", "/faq"];
  for (const p of practices) {
    out.push(`/practices/${p.slug}`);
    for (const s of p.services) out.push(`/services/${s.slug}`);
  }
  return out;
}