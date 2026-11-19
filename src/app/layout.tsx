
import type { Metadata } from "next";
import { Hind_Siliguri, Geist_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/provider";
import { Toaster } from "@/components/ui/toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "News Portal | সর্বশেষ বাংলা সংবাদ",
    template: "%s | News Portal",
  },
  description:
    "বাংলাদেশ ও বিশ্বের সর্বশেষ খবর, রাজনীতি, অর্থনীতি, খেলাধুলা, বিনোদন ও প্রযুক্তির সংবাদ পড়ুন।",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  applicationName: "News Portal",
  keywords: [
    "Bangla News",
    "বাংলা সংবাদ",
    "বাংলাদেশ সংবাদ",
    "Latest News",
    "News Portal",
  ],
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={cn(
        "h-full",
        "antialiased",
        hindSiliguri.variable,
        geistMono.variable,
      )}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
