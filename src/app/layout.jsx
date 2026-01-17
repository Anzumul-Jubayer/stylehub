import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./Components/ConditionalLayout";
import SessionProvider from "./providers/SessionProvider";
import ToastProvider from "./providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Style-Hub",
  description:
    "A modern clothing store built with Next.js and Express, offering seamless product browsing and secure item management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <ToastProvider />
        </SessionProvider>
      </body>
    </html>
  );
}
