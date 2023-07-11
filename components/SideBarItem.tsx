import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";

interface SideBarItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
}

const SideBarItem: React.FC<SideBarItemProps> = ({
  name,
  href,
  icon: Icon,
  active,
}) => {
  return (
    <Link
      className={cn(
        "flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1",
        active && "text-white"
      )}
      href={href}
    >
      <Icon size={26} />
      <p className="truncate w-full">{name}</p>
    </Link>
  );
};

export default SideBarItem;
