import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/auth/AuthProvider";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "EZ Legal Hire | Affordable Online Legal Help ",
  description:
    "Connect with licensed attorneys online for fast, affordable legal help. EZLegalHire offers expert legal advice, document review, and virtual consultations.",
  keywords: [
    "online legal services",
    "hire lawyer online",
    "legal advice",
    "affordable attorneys",
    "virtual legal consultation",
    "EZLegalHire",
    "legal help platform",
  ], // <--- Keywords are now properly quoted strings
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anton.variable}  flex flex-col min-h-screen`}>
        <AuthProvider>
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
