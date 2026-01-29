import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "../components/dashboard/SessionProvider";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Matt Project Solutions | Leading Engineering & IT Project Development",
  description: "Matt Project Solutions offers high-quality academic projects for UG, PG, and Diploma students. Specializing in Web Development, AI, ML, Python, Java, Blockchain, and IoT since 2014.",
  keywords: "college projects, academic projects, engineering projects, final year projects, web development, python projects, AI projects, ML projects, blockchain projects, IoT projects, student project solutions, Matt Project Solutions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {/* Fixed Navbar */}
          <Navbar />

          {/* Main Content with padding to account for fixed navbar */}
          <main className="min-h-screen">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
