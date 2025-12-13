import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/utils/reactQueryProvider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Pathways Academy",
  description: "Unlock your potential with Global Pathways Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                <Navigation  />
                
             {children}
             <Footer   />
          </body>
       </QueryProvider>
    </html>
  );
}
