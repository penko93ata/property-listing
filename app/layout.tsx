import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { twMerge } from "tailwind-merge";
import Providers from "@/lib/query-provider";
import "photoswipe/dist/photoswipe.css";
import { Toaster } from "sonner";

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
    <Providers>
      <html lang='en'>
        <body className={twMerge(inter.className, "flex flex-col")}>
          <div className='flex flex-col justify-between h-[100dvh]'>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
          <Toaster richColors closeButton position='top-center' />
        </body>
      </html>
    </Providers>
  );
}
