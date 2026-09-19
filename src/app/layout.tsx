import type { Metadata, Viewport } from "next";
import "@fontsource/albert-sans/400.css";
import "@fontsource/albert-sans/500.css";
import "@fontsource/albert-sans/600.css";
import "@fontsource/albert-sans/700.css";
import "@fontsource/bodoni-moda/400.css";
import "./globals.css";
import { site } from "@/data/site";
import { Header } from "@/components/Header";
import { TabBar } from "@/components/TabBar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { salonSchema } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Hair Salon & Spa in Memphis, TN | Textures Salon & Spa", template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  appleWebApp: { capable: true, title: site.shortName, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: true, address: true, email: true },
  // TODO: add public/brand/apple-touch-icon.png (180×180, brandmark on Noir) and list it here as `apple`.
  icons: { icon: "/brand/brandmark-mustard.svg" },
};

export const viewport: Viewport = {
  themeColor: "#10130F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <TabBar />
        <JsonLd data={salonSchema()} />
      </body>
    </html>
  );
}
