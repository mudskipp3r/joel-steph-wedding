import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PasswordProtection from "@/components/PasswordProtection";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joel & Stephanie - Wedding",
  description: "Join us in celebrating our special day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PasswordProtection>
          {children}
        </PasswordProtection>
      </body>
    </html>
  );
}
