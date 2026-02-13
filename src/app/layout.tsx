import type { Metadata } from "next";

import "@/app/globals.css";
import "@/styles/print.css";

export const metadata: Metadata = {
  title: "中陰・年回表 PDF Generator",
  description: "A4縦の縦書き中陰・年回表をプレビューし、印刷でPDF保存するためのアプリ"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
