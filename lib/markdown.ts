import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PrivacyDoc = {
  slug: string;
  data: Record<string, unknown>;
  content: string;
};

const contentDir = path.join(process.cwd(), "content/privacy");

export async function listPrivacySlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(contentDir);
    return files
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export async function getPrivacyBySlug(
  slug: string
): Promise<PrivacyDoc | null> {
  try {
    const filePath = path.join(contentDir, `${slug}.md`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return { slug, data, content };
  } catch {
    return null;
  }
}
