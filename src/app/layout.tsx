import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Inter,Noto_Sans_Cypriot } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SideNav from "@/components/SideNav";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });
const noto_sans_cypriot = Noto_Sans_Cypriot({
  subsets: ["latin"],
  weight: "400"
});


export const metadata: Metadata = {
  title: "todoS",
  description: "todoS is a todo app built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={cn("grid grid-cols-12 gap-2 max-h-screen w-full", noto_sans_cypriot.className)}>
        <div className="col-start-1 col-end-3 min-h-screen relative">
          <SideNav />
        </div>
        <main className="col-start-3 col-end-13">
        {children}
        </main>
        <Toaster />
      </body>
      </html>
      </ClerkProvider>
  );
}
