import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { SiteHeader } from "../components/site-header";

const siteName = "Privacy Hub";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: "One hub for all your apps' privacy policies.",
  keywords: ["privacy policy", "apps", "mobile", "gdpr", "ccpa"],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description: "One hub for all your apps' privacy policies.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="container mx-auto w-full max-w-5xl flex-1 px-4 py-8">
              {children}
            </main>
            <footer className="border-t">
              <div className="container mx-auto max-w-5xl px-4 py-10 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Privacy Hub. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}