import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel App",
  description: "Know Marvel Characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col items-center bg-neutral-50 min-h-[100dvh] justify-between`}
      >
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
