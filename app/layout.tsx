import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { twMerge } from "tailwind-merge";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Property Rental Listings",
  description: "Find your dream rental property",
  keywords: ["rental", "property", "listings", "properties", "rent"],
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={twMerge(inter.className, "flex flex-col h-dvh")}>
          <div>
          <Navbar />
          <main>{children}</main>
          <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
