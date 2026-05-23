import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import clsx from "clsx";

type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuItem>;

export function HeaderPageMoreActionsItem({
  icon: Icon,
  title,
  className,
  iconClassName,
  ...props
}: {
  icon: LucideIcon;
  title: ReactNode;
  iconClassName?: string;
} & DropdownMenuItemProps) {
  return (
    <DropdownMenuItem className={clsx("gap-2", className)} {...props}>
      <Icon className={clsx("size-4", iconClassName)} />
      {title}
    </DropdownMenuItem>
  );
}
