import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";


export const metadata: Metadata = {
  title: "@aniltalla",
  description: "Welcome to Anil Talla's blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background antialiased mb-12">
        <Providers>
          <div className="container relative">
            <header className="flex items-center justify-between py-6">
              <Link href="/">
                <h1 className="text-4xl font-bold text-foreground">
                  @aniltalla
                </h1>
              </Link>
              <ThemeToggle />
            </header>
            <main>{children}</main>

          </div>
        </Providers>
      </body>
    </html>
  );
}
