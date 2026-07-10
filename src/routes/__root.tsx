import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { practices } from "../data/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Infinite Retina — Consulting & Advisory" },
      {
        name: "description",
        content:
          "A focused B2B consulting practice across funding, customers, attention, operations, culture, talent and legal — for founders and executives translating ambition into measurable outcomes.",
      },
      { name: "author", content: "Infinite Retina" },
      { property: "og:title", content: "Infinite Retina — Consulting & Advisory" },
      {
        property: "og:description",
        content:
          "Seven disciplines. One integrated practice. Consulting for organisations preparing for their next level of performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@InfiniteRetina" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-brand-yellow border-b-[3px] border-brand-ink">
      <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-display uppercase text-xl tracking-tight" onClick={() => setOpen(false)}>
          <span className="inline-block h-6 w-6 bg-brand-ink border-[3px] border-brand-ink rotate-3" />
          Infinite Retina
        </Link>
        <nav className="hidden md:flex items-center gap-1 font-mono text-sm font-bold uppercase">
          <NavItem to="/services">Services</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/faq">FAQ</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <Link
            to="/book"
            className="ml-3 inline-flex items-center px-4 py-2 bg-brand-ink text-brand-yellow border-[3px] border-brand-ink nb-shadow-sm nb-press font-display uppercase"
          >
            Book Call →
          </Link>
        </nav>
        <button
          className="md:hidden inline-flex items-center px-3 py-2 border-[3px] border-brand-ink bg-background nb-shadow-sm font-mono text-xs font-bold uppercase"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t-[3px] border-brand-ink bg-brand-yellow px-4 py-4 space-y-2 font-mono uppercase text-sm font-bold">
          {[
            ["/services", "Services"],
            ["/about", "About"],
            ["/faq", "FAQ"],
            ["/contact", "Contact"],
            ["/book", "Book a Call"],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="block px-3 py-2 border-[3px] border-brand-ink bg-background"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="px-3 py-2 hover:bg-brand-ink hover:text-brand-yellow border-[3px] border-transparent hover:border-brand-ink transition-colors"
      activeProps={{ className: "bg-brand-ink text-brand-yellow" }}
    >
      {children}
    </Link>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-20 bg-brand-ink text-brand-yellow border-t-[3px] border-brand-ink">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display uppercase text-2xl">Infinite Retina</div>
          <p className="mt-3 text-sm text-brand-yellow/80 font-mono">
            Seven disciplines. One integrated practice.
          </p>
          <Link
            to="/book"
            className="mt-6 inline-flex items-center px-4 py-2 bg-brand-yellow text-brand-ink border-[3px] border-brand-yellow font-display uppercase nb-press"
          >
            Book a Free Consultation →
          </Link>
        </div>
        <div>
          <div className="font-display uppercase mb-3">Practices</div>
          <ul className="space-y-2 font-mono text-sm">
            {practices.map((p) => (
              <li key={p.slug}>
                <Link to="/practices/$slug" params={{ slug: p.slug }} className="hover:underline underline-offset-4">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-display uppercase mb-3">Company</div>
          <ul className="space-y-2 font-mono text-sm">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/services" className="hover:underline">All Services</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-display uppercase mb-3">Elsewhere</div>
          <ul className="space-y-2 font-mono text-sm">
            <li>hello@infiniteretina.com</li>
            <li>LinkedIn</li>
            <li>Substack</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-yellow/30 py-4 text-center font-mono text-xs">
        © {new Date().getFullYear()} Infinite Retina. All rights reserved.
      </div>
    </footer>
  );
}
