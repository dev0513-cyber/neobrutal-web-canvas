import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type BtnProps = {
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "pink" | "cyan" | "lime";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

const variantClasses: Record<NonNullable<BtnProps["variant"]>, string> = {
  primary: "bg-brand-ink text-brand-yellow",
  secondary: "bg-brand-yellow text-brand-ink",
  outline: "bg-background text-brand-ink",
  pink: "bg-brand-pink text-white",
  cyan: "bg-brand-cyan text-brand-ink",
  lime: "bg-brand-lime text-brand-ink",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function NBButton({ to, href, variant = "primary", size = "md", className = "", children, ...rest }: BtnProps) {
  const base = `inline-flex items-center gap-2 font-display uppercase tracking-tight nb-border nb-shadow nb-press ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={base}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={base} {...rest}>
      {children}
    </a>
  );
}

export function Tape({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`nb-tape ${className}`}>{children}</span>;
}

export function NBCard({
  children,
  className = "",
  tint = "card",
}: {
  children: ReactNode;
  className?: string;
  tint?: "card" | "yellow" | "pink" | "cyan" | "lime" | "ink";
}) {
  const tints: Record<string, string> = {
    card: "bg-card",
    yellow: "bg-brand-yellow",
    pink: "bg-brand-pink text-white",
    cyan: "bg-brand-cyan",
    lime: "bg-brand-lime",
    ink: "bg-brand-ink text-brand-yellow",
  };
  return <div className={`nb-border nb-shadow ${tints[tint]} ${className}`}>{children}</div>;
}

export function SectionHeader({
  label,
  title,
  kicker,
}: {
  label?: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="mb-10">
      {label && <Tape className="mb-4">{label}</Tape>}
      <h2 className="text-4xl md:text-6xl font-display uppercase leading-[0.9] max-w-4xl">{title}</h2>
      {kicker && <p className="mt-4 text-lg md:text-xl max-w-3xl text-muted-foreground">{kicker}</p>}
    </div>
  );
}

/** Renders a paragraph block: splits on blank lines, bolds "Label:" prefixes. */
export function Prose({ body, className = "" }: { body: string; className?: string }) {
  const blocks = body.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  return (
    <div className={`space-y-4 text-base md:text-lg leading-relaxed ${className}`}>
      {blocks.map((b, i) => {
        const m = b.match(/^([A-Z][A-Za-z0-9 &/\-]{1,50})\.\s+(.*)/s);
        if (m) {
          return (
            <p key={i}>
              <strong className="font-display uppercase text-brand-ink">{m[1]}.</strong>{" "}
              {m[2]}
            </p>
          );
        }
        return <p key={i}>{b}</p>;
      })}
    </div>
  );
}