import "./globals.css";

import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "BiznagaFest 2024 - Componentización eficiente",
  description: "React Good Example",
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
