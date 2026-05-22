import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "VidFeed — Vertical Video Feed",
  description: "TikTok-style vertical video scrolling demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="overflow-hidden bg-black text-white">
        <Navigation />
        <main className="h-screen md:ml-20 lg:ml-60">{children}</main>
      </body>
    </html>
  );
}