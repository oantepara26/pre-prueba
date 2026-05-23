import { MoreVertical } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

type DropdownMenuProps = ComponentProps<typeof DropdownMenu>;

export function HeaderPageMoreActions({
  title = "Opciones",
  icon = <MoreVertical size={18} />,
  children,
  ...dropdownMenuProps
}: {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
} & DropdownMenuProps) {
  return (
    <DropdownMenu {...dropdownMenuProps}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={clsx(
            "h-10 flex items-center gap-2 rounded-xl",
            "border border-blue-400 px-4",
            "font-medium text-blue-500 transition",
            "hover:bg-blue-50 hover:text-blue-500",
            "focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none",
            "[WebkitTapHighlightColor:transparent]",
            "data-[state=open]:bg-blue-50",
          )}
        >
          {icon}
          {title}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-2xl">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
