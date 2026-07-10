import { createFileRoute } from "@tanstack/react-router";
import { PageRenderer } from "@/components/content-page";
import { pageByNum, seo } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => {
    const p = pageByNum(6);
    const m = seo(p);
    return {
      meta: [
        { title: m.title ?? "Frequently Asked Questions — Infinite Retina" },
        { name: "description", content: m.description ?? "Answers to the questions clients ask before beginning an engagement." },
      ],
    };
  },
  component: () => <PageRenderer page={pageByNum(6)} accent="yellow" />,
});