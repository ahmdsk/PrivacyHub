import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto max-w-5xl flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-semibold no-underline hover:opacity-80">
          Privacy Hub
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground no-underline">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground no-underline">
            Terms
          </Link>
          <Link href="/generator" className="text-sm text-muted-foreground hover:text-foreground no-underline">
            Generator
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
