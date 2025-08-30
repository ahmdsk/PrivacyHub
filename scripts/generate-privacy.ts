import fs from "node:fs/promises";
import path from "node:path";
import mustache from "mustache";

type AppPolicy = {
  slug: string;
  app_name: string;
  company_name: string;
  contact_email: string;
  data_collected: string; // Markdown list items
  purposes: string;       // Markdown list items
  third_parties: string;  // Markdown list items
  updated: string;        // ISO date
};

async function ensureDir(p: string) {
  try { await fs.mkdir(p, { recursive: true }); } catch {}
}

async function main() {
  const appsPath = path.join(process.cwd(), "apps.json");
  const templatePath = path.join(process.cwd(), "templates/privacy-template.md");
  const outDir = path.join(process.cwd(), "content/privacy");

  const raw = await fs.readFile(appsPath, "utf8");
  const apps: AppPolicy[] = JSON.parse(raw);

  const template = await fs.readFile(templatePath, "utf8");
  await ensureDir(outDir);

  for (const app of apps) {
    const output = mustache.render(template, app);
    const outPath = path.join(outDir, `${app.slug}.md`);
    await fs.writeFile(outPath, output, "utf8");
    console.log("Generated:", outPath);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
