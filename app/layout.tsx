import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import getSongsByUserId from "@/actions/getSongsByUserId";
import Sidebar from "@/components/Sidebar";
import ReduxProvider from "@/provider/ReduxProvider";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Sound Vibe",
  description: "Listen to a variety of musics for free",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

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
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Toaster />
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
