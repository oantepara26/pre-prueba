import { Search } from "lucide-react";
import { debounce } from "lodash";
import {
  type ChangeEvent,
  type InputHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onFinish?: (value: string) => void;
  debounceTime?: number;
};

export default function SearchInput({
  value,
  onChange,
  onFinish,
  debounceTime = 500,
  className,
  defaultValue = "",
  ...props
}: SearchInputProps) {
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(
    String(defaultValue ?? ""),
  );

  const currentValue = isControlled ? String(value ?? "") : internalValue;

  const debouncedFinish = useMemo(() => {
    if (!onFinish) {
      return null;
    }

    return debounce((value: string) => {
      onFinish(value);
    }, debounceTime);
  }, [onFinish, debounceTime]);

  useEffect(() => {
    return () => {
      debouncedFinish?.cancel();
    };
  }, [debouncedFinish]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(e);

    debouncedFinish?.(newValue);
  };

  return (
    <div className="relative w-full max-w-xl">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />

      <input
        {...props}
        value={currentValue}
        onChange={handleChange}
        className={`h-12 w-full rounded-xl border border-slate-200 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 ${className ?? ""}`}
      />
    </div>
  );
}
