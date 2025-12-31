import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zhefan(Ben) Guo",
  description: "Personal website + BenBot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
