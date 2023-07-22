"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight, Home, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UploadModal from "./UploadModal";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ children, className }: Props) => {
  const [canGoBack, setCanGoBack] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      setCanGoBack(true);
    }
  }, []);

  return (
    <div
      className={cn("h-fit bg-gradient-to-b from-emerald-800 p-6", className)}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <Button
            onClick={() => router.back()}
            size={"icon"}
            className={cn(
              "bg-black flex items-center justify-center hover:opacity-75 transition",
              canGoBack
                ? ""
                : "cursor-not-allowed opacity-50 pointer-events-none"
            )}
          >
            <ChevronLeft size={26} className="text-white" />
          </Button>
          <Button
            onClick={() => router.forward()}
            size={"icon"}
            className="bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <ChevronRight size={26} className="text-white" />
          </Button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="p-2 bg-white flex items-center jc hover:opacity-75 transition"
            onClick={() => router.push("/")}
          >
            <Home className="text-black " size={20} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="p-2 bg-white flex items-center jc hover:opacity-75 transition"
            onClick={() => router.push("/search")}
          >
            <Search className="text-black " size={20} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="p-2 bg-white flex items-center jc hover:opacity-75 transition"
          >
            <UploadModal />
          </Button>
        </div>
        <div className="flex gap-x-5 items-center justify-between">
          <div className="flex justify-between items-center gap-x-4">
            <HoverCard>
              <HoverCardTrigger>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="p-2 bg-white flex items-center jc hover:opacity-75 transition"
                >
                  <p className="text-black text-xl font-extrabold">?</p>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                This is a free project developed{" "}
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/samikhan73"
                >
                  Samiullah
                </Link>{" "}
                by and designed and documented by{" "}
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/syedsyab/"
                >
                  Syed Syab
                </Link>{" "}
                for{" "}
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/company/ineuron-ai/mycompany/"
                >
                  iNeuron.ai
                </Link>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex justify-between items-center gap-x-4">
            <UserButton />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
