import Link from "next/link";
import { listSlugs } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [privacy, terms] = await Promise.all([
    listSlugs("privacy"),
    listSlugs("terms"),
  ]);

  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-muted-foreground">
          Centralize all your apps’ <strong>Privacy Policies</strong> and{" "}
          <strong>Terms &amp; Conditions</strong>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Privacy Policies</h2>
        {privacy.length === 0 ? (
          <p className="text-muted-foreground">No privacy policies yet.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {privacy.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/privacy/${slug}`}
                  className="block rounded-xl border p-4 hover:bg-accent"
                >
                  <div className="font-medium">{slug}</div>
                  <div className="text-sm text-muted-foreground">
                    View policy
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Terms &amp; Conditions</h2>
        {terms.length === 0 ? (
          <p className="text-muted-foreground">No terms yet.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {terms.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/terms/${slug}`}
                  className="block rounded-xl border p-4 hover:bg-accent"
                >
                  <div className="font-medium">{slug}</div>
                  <div className="text-sm text-muted-foreground">
                    View terms
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
