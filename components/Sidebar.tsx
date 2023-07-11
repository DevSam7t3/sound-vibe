"use client";

import { useMemo } from "react";

import { Home, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Box from "./Box";
import Library from "./Library";
import SideBarItem from "./SideBarItem";

interface SideBarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SideBarProps> = ({ children }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        name: "Home",
        href: "/",
        icon: Home,
        active: pathname !== "/search",
      },
      {
        name: "Search",
        href: "/search",
        icon: Search,
        active: pathname === "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box className="">
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SideBarItem key={item.name} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto md:py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
