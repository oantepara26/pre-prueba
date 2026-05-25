import { Search, X } from "lucide-react";
import { type InputHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
	onClear?: () => void;
};

export default function SearchInput({
	value,
	className,
	onClear,
	...props
}: SearchInputProps) {
	return (
		<div className="relative w-full max-w-xl">
			<Search
				className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
				size={18}
			/>

			<Input
				{...props}
				value={value}
				className={cn(
					"h-12 border-slate-200 pl-12 pr-12 focus-visible:ring-2 focus-visible:ring-blue-500",
					className
				)}
			/>

			{value && onClear && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={onClear}
					className="absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full p-0"
				>
					<X size={16} />
				</Button>
			)}
		</div>
	);
}
