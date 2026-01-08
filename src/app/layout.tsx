// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { EventsProvider } from "@/context/EventsContext";
import { SettingsProvider } from "@/context/SettingsContext";
import SettingsModal from "@/components/settings/SettingsModal";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = { title: "Glass Calendar", description: "Beautiful Glassmorphism Calendar" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SettingsProvider>
          <EventsProvider>
            {children}
            <SettingsModal />
          </EventsProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}