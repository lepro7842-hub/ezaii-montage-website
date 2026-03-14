import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Righteous, Dancing_Script } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const righteous = Righteous({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
});

const dancingScript = Dancing_Script({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ezaii — Monteur Vidéo Gaming pour YouTubeurs",
  description:
    "Monteur vidéo professionnel spécialisé gaming. Montages rythmés à haute rétention pour YouTubeurs francophones. Oncl3pick, Neku, Anakin, Cubi-Game et plus.",
  keywords: ["monteur vidéo", "gaming", "youtube", "montage", "ezaii", "monteur gaming", "éditeur vidéo"],
  authors: [{ name: "Ezaii" }],
  openGraph: {
    title: "Ezaii — Monteur Vidéo Gaming pour YouTubeurs",
    description: "Je propulse les vidéos des créateurs avec un montage rythmé à haute rétention.",
    type: "website",
    locale: "fr_FR",
    siteName: "Ezaii Montage",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezaii — Monteur Vidéo Gaming",
    description: "Montages rythmés à haute rétention pour YouTubeurs francophones.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${righteous.variable} ${dancingScript.variable} antialiased bg-slate-950 text-slate-100`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
