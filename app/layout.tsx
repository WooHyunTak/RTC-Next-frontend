"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/authContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-primary-100 h-screen w-full flex flex-col`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
