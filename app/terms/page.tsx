import Link from "next/link";
import { listSlugs } from "../../lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Terms & Conditions",
  description: "Browse all app Terms & Conditions.",
  alternates: { canonical: "/terms" },
};

export default async function TermsIndex() {
  const slugs = await listSlugs("terms");
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          All Terms & Conditions
        </h1>
        <p className="text-muted-foreground">Choose a document below.</p>
      </div>
      {slugs.length === 0 ? (
        <p className="text-muted-foreground">No terms yet.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {slugs.map((slug) => (
            <li key={slug}>
              <Link
                href={`/terms/${slug}`}
                className="block rounded-xl border p-4 transition-colors hover:bg-accent"
              >
                <div className="font-medium">{slug}</div>
                <div className="text-sm text-muted-foreground">View terms</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
