import clsx from "clsx";
import { type LucideIcon } from "lucide-react";

const colorVariants = {
  blue: {
    wrapper: "bg-blue-100",
    icon: "text-blue-600",
  },
  green: {
    wrapper: "bg-green-100",
    icon: "text-green-600",
  },
  orange: {
    wrapper: "bg-orange-100",
    icon: "text-orange-600",
  },
  purple: {
    wrapper: "bg-purple-100",
    icon: "text-purple-600",
  },
  red: {
    wrapper: "bg-red-100",
    icon: "text-red-600",
  },
};

type HeaderPageColor = keyof typeof colorVariants;

export default function HeaderPage({
  title,
  icon: Icon,
  color = "blue",
  children,
}: {
  title: string;
  icon: LucideIcon;
  color?: HeaderPageColor;
  children?: React.ReactNode;
}) {
  const colors = colorVariants[color];
  return (
    <div className="flex items-center justify-between gap-4 border-b px-6 py-6">
      <div className="flex items-center gap-4">
        <div
          className={clsx(
            "flex h-14 w-14 items-center justify-center rounded-2xl",
            colors.wrapper,
          )}
        >
          <Icon className={colors.icon} size={28} />
        </div>

        <h1 className="text-4xl font-bold text-slate-900">{title}</h1>
      </div>

      {children && (
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2">{children}</div>
        </div>
      )}
    </div>
  );
}
