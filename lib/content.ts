// lib/content.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type DocType = "privacy" | "terms";

export type AppDoc = {
  slug: string;
  data: Record<string, unknown>;
  content: string;
};

function dirFor(type: DocType) {
  return path.join(process.cwd(), `content/${type}`);
}

export async function listSlugs(type: DocType): Promise<string[]> {
  try {
    const files = await fs.readdir(dirFor(type));
    return files
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

export async function getDocBySlug(
  type: DocType,
  slug: string
): Promise<AppDoc | null> {
  try {
    const filePath = path.join(dirFor(type), `${slug}.md`);
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    return { slug, data, content };
  } catch {
    return null;
  }
}

/* ---------- Enhanced Markdown Rendering (HTML + TOC) ---------- */

export type TocItem = { id: string; text: string; level: number };

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Render markdown ke HTML + kumpulkan TOC (H2–H4) dan auto-anchor (#) */
export function renderMarkdown(md: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const renderer = new marked.Renderer();

  renderer.heading = (text: string, level: number) => {
    if (level >= 2 && level <= 4) {
      const id = slugify(text);
      toc.push({ id, text, level });
      return `<h${level} id="${id}">${text}<a href="#${id}" class="anchor" aria-label="Link to section">#</a></h${level}>`;
    }
    return `<h${level}>${text}</h${level}>`;
  };

  // Disable default headerIds to avoid duplicate ids; we set our own
  marked.setOptions({ renderer });

  const html = marked.parse(md) as string;
  return { html, toc };
}
