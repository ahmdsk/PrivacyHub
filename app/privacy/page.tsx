import Link from "next/link";
import { listPrivacySlugs } from "../../lib/markdown";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Privacy Policies",
  description: "Browse all app privacy policies.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyIndex() {
  const slugs = await listPrivacySlugs();

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          All Privacy Policies
        </h1>
        <p className="text-muted-foreground">Pick a policy below.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Policies</CardTitle>
          <Badge variant="secondary">{slugs.length}</Badge>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {slugs.length === 0 ? (
            <p className="text-muted-foreground">No policies yet.</p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {slugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/privacy/${slug}`}
                    className="block rounded-xl border p-4 transition-colors hover:bg-accent"
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
        </CardContent>
      </Card>
    </section>
  );
}
