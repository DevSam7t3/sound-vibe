"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight, Home, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ children, className }: Props) => {
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    // TODO: handle logout
  };

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
          >
            <Home className="text-black " size={20} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="p-2 bg-white flex items-center jc hover:opacity-75 transition"
          >
            <Search className="text-black " size={20} />
          </Button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <UserButton />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
