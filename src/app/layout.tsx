import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "リレキト｜事務職の履歴書、強み診断で一気に仕上げる",
  description:
    "リレキトは事務職への転職に特化した履歴書作成ツール。強みを診断するだけで自己PRが完成し、そのまま履歴書PDFで出力できます。登録不要・完全無料。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
