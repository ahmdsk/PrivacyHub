"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import { saveAs } from "../../lib/save-as";

type DocType = "privacy" | "terms";

const DEFAULTS = {
  company: "",
  appName: "",
  contactEmail: "",
  slug: "",
  dataCollected:
    "- Email (optional)\n- Crash logs\n- Device model (anonymized)",
  purposes: "- Authentication\n- Analytics\n- Product improvement",
  thirdParties: "- Google Analytics for Firebase\n- Sentry",
  updated: new Date().toISOString().slice(0, 10),
};

const PRIVACY_TEMPLATE = `---
title: Privacy Policy – {{appName}}
description: Privacy Policy for {{appName}} by {{company}}.
updated: {{updated}}
---

This Privacy Policy explains how **{{appName}}** ("the App") operated by **{{company}}** ("we","us") collects, uses, and shares information.

## Data We Collect
{{dataCollected}}

## Purpose of Processing
{{purposes}}

## Third-Party Services
{{thirdParties}}

## Data Retention
- We retain data only as long as necessary for the purposes set out in this policy.

## Security
- We implement industry-standard safeguards to protect your data.

## Your Rights
- Depending on your region (e.g. GDPR/EEA, CCPA/CPRA), you may have rights to access, correct, delete, or restrict processing.

## Contact
Email: {{contactEmail}}

## Changes
We may update this Privacy Policy from time to time. Please review this page periodically for changes.
`;

const TERMS_TEMPLATE = `---
title: Terms & Conditions – {{appName}}
description: Terms & Conditions for {{appName}} by {{company}}.
updated: {{updated}}
---

By accessing or using **{{appName}}** ("the App"), you agree to be bound by these Terms & Conditions.

## Use of the App
- You must comply with applicable laws and policies.
- You are responsible for maintaining the security of your account.

## Intellectual Property
- All content and materials are owned by us or our licensors.

## Payments (if applicable)
- Fees, billing cycles, and refund policies may be described within the App or purchase flow.

## Disclaimers
- The App is provided "as is" without warranties.

## Limitation of Liability
- To the maximum extent permitted by law, we are not liable for indirect or consequential damages.

## Termination
- We may suspend or terminate access if you violate these terms.

## Governing Law
- Specify the jurisdiction that governs these terms.

## Contact
Email: {{contactEmail}}

## Changes
We may update these Terms from time to time. Please check this page periodically.
`;

function render(template: string, vars: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

export default function GeneratorPage() {
  const [type, setType] = useState<DocType>("privacy");
  const [form, setForm] = useState({ ...DEFAULTS });

  const template = type === "privacy" ? PRIVACY_TEMPLATE : TERMS_TEMPLATE;

  const markdown = useMemo(
    () =>
      render(template, {
        company: form.company.trim(),
        appName: form.appName.trim(),
        contactEmail: form.contactEmail.trim(),
        updated: form.updated,
        dataCollected: form.dataCollected,
        purposes: form.purposes,
        thirdParties: form.thirdParties,
      }),
    [template, form]
  );

  const htmlPreview = useMemo(() => marked.parse(markdown), [markdown]);

  function onDownload() {
    const slug = (form.slug || form.appName || "my-app")
      .toLowerCase()
      .replace(/[^a-z0-9\-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    const pathHint = type === "privacy" ? "content/privacy" : "content/terms";
    saveAs(`${slug}.md`, markdown, `Put this into: ${pathHint}/${slug}.md`);
  }

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Document Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Fill the fields, preview on the right, then download the Markdown and
          place it under
          <code className="mx-1 rounded bg-muted px-1 py-0.5">
            content/{type === "privacy" ? "privacy" : "terms"}/&lt;slug&gt;.md
          </code>
        </p>

        <div className="grid gap-3">
          <label className="text-sm font-medium">Type</label>
          <div className="flex gap-2">
            <button
              className={`rounded-lg border px-3 py-2 text-sm ${
                type === "privacy"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
              onClick={() => setType("privacy")}
            >
              Privacy
            </button>
            <button
              className={`rounded-lg border px-3 py-2 text-sm ${
                type === "terms"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
              onClick={() => setType("terms")}
            >
              Terms
            </button>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Slug (optional)</label>
            <input
              className="rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="my-awesome-app"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">App Name</label>
            <input
              className="rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="My Awesome App"
              value={form.appName}
              onChange={(e) => update("appName", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Company</label>
            <input
              className="rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="PT Contoh Teknologi"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Contact Email</label>
            <input
              className="rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="privacy@contoh.co"
              value={form.contactEmail}
              onChange={(e) => update("contactEmail", e.target.value)}
            />
          </div>

          {type === "privacy" && (
            <>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Data Collected (Markdown list)
                </label>
                <textarea
                  className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
                  value={form.dataCollected}
                  onChange={(e) => update("dataCollected", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Purposes (Markdown list)
                </label>
                <textarea
                  className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
                  value={form.purposes}
                  onChange={(e) => update("purposes", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Third Parties / SDKs (Markdown list)
                </label>
                <textarea
                  className="min-h-24 rounded-md border bg-background px-3 py-2 text-sm"
                  value={form.thirdParties}
                  onChange={(e) => update("thirdParties", e.target.value)}
                />
              </div>
            </>
          )}

          <div className="grid gap-2">
            <label className="text-sm font-medium">Updated (ISO date)</label>
            <input
              className="rounded-md border bg-background px-3 py-2 text-sm"
              type="date"
              value={form.updated}
              onChange={(e) => update("updated", e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              className="rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90"
              onClick={onDownload}
            >
              Download .md
            </button>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section className="rounded-xl border p-4">
        <div className="prose max-w-none dark:prose-invert">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: htmlPreview }} />
        </div>
      </section>
    </div>
  );
}
