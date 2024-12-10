import "./globals.css";

import type { Metadata } from "next";
import { ToastProvider } from '@/context/ToastContext';



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
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
