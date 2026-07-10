import { createFileRoute } from "@tanstack/react-router";
import { PageRenderer } from "@/components/content-page";
import { pageByNum, seo } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => {
    const p = pageByNum(2);
    const meta = seo(p);
    return {
      meta: [
        { title: meta.title ?? "About — Infinite Retina" },
        {
          name: "description",
          content:
            meta.description ??
            "A premium consulting practice built to close the gap between advice that sounds compelling and advice that produces results.",
        },
        { property: "og:title", content: meta.title ?? "About — Infinite Retina" },
        { property: "og:description", content: meta.description ?? "" },
      ],
    };
  },
  component: () => <PageRenderer page={pageByNum(2)} accent="cyan" />,
});