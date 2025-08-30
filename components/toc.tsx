"use client";

import * as React from "react";
import { cn } from "../lib/utils";

type TocItem = { id: string; text: string; level: number };

export function Toc({
  items,
  className,
}: {
  items: TocItem[];
  className?: string;
}) {
  if (!items?.length) return null;
  return (
    <nav className={cn("text-sm", className)} aria-label="Table of contents">
      <div className="mb-2 font-semibold">Contents</div>
      <ul className="space-y-1">
        {items.map((it) => (
          <li
            key={it.id}
            className={cn({
              "ml-0": it.level === 2,
              "ml-3": it.level === 3,
              "ml-6": it.level === 4,
            })}
          >
            <a
              href={`#${it.id}`}
              className="no-underline text-muted-foreground hover:text-foreground"
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
