import "./globals.css";

import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Refactoriza tu web/app usando IA",
  description: "Taller de Garaje de ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
