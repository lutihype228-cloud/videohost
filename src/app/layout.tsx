import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "DIDDYDIDDY",
  description:
    "Файлообенник с интеграцией Twitch - загружайте файлы и делитесь моментальными ссылками.",
  icons: {
    icon: "https://ext.same-assets.com/37815594/989014101.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
