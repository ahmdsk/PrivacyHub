import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPrivacyBySlug } from "../../../lib/markdown";
import { Card, CardContent } from "../../../components/ui/card";
import { renderMarkdown } from "../../../lib/content";
import { Badge } from "../../../components/ui/badge";
import { PrintButton } from "../../../components/print-button";
import { Toc } from "../../../components/toc";

export const dynamic = "force-dynamic";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = await getPrivacyBySlug(params.slug);
  if (!doc) return { title: "Not Found" };
  const title = (doc.data?.title as string) || `Privacy Policy – ${params.slug}`;
  const description = (doc.data?.description as string) || "Privacy policy for this application.";
  const url = `${siteUrl}/privacy/${params.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const doc = await getPrivacyBySlug(params.slug);
  if (!doc) notFound();

  const { html, toc } = renderMarkdown(doc.content);
  const updated = String(doc.data?.updated ?? "—");
  const title = (doc.data?.title as string) ?? "Privacy Policy";

  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_260px]">
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <Badge variant="secondary">Last updated: {updated}</Badge>
          <PrintButton />
        </div>
        <Card>
          <CardContent className="prose max-w-none py-8">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </CardContent>
        </Card>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-xl border p-4">
          <Toc items={toc} />
        </div>
      </aside>
    </section>
  );
}
