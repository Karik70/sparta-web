import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "SPARTA | Таэквондо GTF Астана",
  description: "Алмашев Руслан Мырзабаевич — сертифицированный тренер по таэквондо GTF с черным поясом 4 дана. Спортивная семья SPARTA в Астане.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
