import * as React from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { type LucideIcon } from "lucide-react";

const colorVariants = {
  blue: {
    wrapper: "border-blue-500 text-blue-500 hover:bg-blue-50",
  },
  green: {
    wrapper: "border-green-500 text-green-500 hover:bg-green-50",
  },
  orange: {
    wrapper: "border-orange-500 text-orange-500 hover:bg-orange-50",
  },
  purple: {
    wrapper: "border-purple-500 text-purple-500 hover:bg-purple-50",
  },
  red: {
    wrapper: "border-red-500 text-red-500 hover:bg-red-50",
  },
} as const;

type ActionButtonColor = keyof typeof colorVariants;

interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  icon: LucideIcon;
  color?: ActionButtonColor;
  iconClassName?: string;
}

export function ActionButton({
  icon: Icon,
  color = "blue",
  className,
  iconClassName,
  variant = "outline",
  size = "icon",
  ...props
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={clsx(
        "h-10 w-10 rounded-xl transition",
        colorVariants[color].wrapper,
        className,
      )}
      {...props}
    >
      <Icon className={clsx("size-4", iconClassName)} />
    </Button>
  );
}
