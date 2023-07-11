import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import ReduxProvider from "@/provider/ReduxProvider";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sound Vibe",
  description: "Listen to a variety of musics for free",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="dark">
        <body className={figtree.className}>
          <ReduxProvider>
            {/* <Navbar /> */}
            <Sidebar>{children}</Sidebar>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
