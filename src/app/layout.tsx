import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Plus_Jakarta_Sans } from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "CV",
  description: "Create you cv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(jakarta.className , "min-h-screen flex flex-col overflow-hidden")}>
        <header className="bg-gray-800 text-white p-4">CV Maker</header>
          <main className="flex flex-1 h-full max-h-[calc(100vh-112px)]">
            {children}
          </main>
        <footer className="bg-gray-800 text-white p-4 text-center">© 2024 CV Maker</footer>
      </body>
    </html>
  );
}
