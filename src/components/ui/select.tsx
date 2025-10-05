import React, { useEffect, useMemo, useRef, useState } from "react";
import { tv, cnBase } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

// --- Types
export type SelectOption = { label: string; value: string };

export type SmartSelectProps = {
  mode?: "local" | "server"; // server -> use fetchOptions
  options?: SelectOption[]; // for local mode
  fetchOptions?: (query: string) => Promise<SelectOption[]>; // for server mode
  freeInput?: boolean; // allow values not in list
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "small" | "middle" | "large";
  shape?: "default" | "round";
  block?: boolean;
  // Controlled / uncontrolled
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: SelectOption | null) => void;
};

// --- Styles (même ADN que Button)
const selectStyles = tv({
  base: ["relative inline-flex flex-col"],
  variants: { block: { true: "w-full", false: "w-fit" } },
});

const inputStyles = tv({
  base: [
    "w-full",
    "border rounded-md",
    "bg-white text-gray-900",
    "placeholder:text-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2",
    "dark:bg-gray-900 dark:text-gray-100",
    "disabled:opacity-60 disabled:cursor-not-allowed",
  ],
  variants: {
    size: {
      small: "px-3 py-1 text-sm",
      middle: "px-4 py-2 text-base",
      large: "px-5 py-2.5 text-lg",
    },
    shape: { default: "rounded-md", round: "rounded-full" },
  },
  defaultVariants: { size: "middle", shape: "default" },
});

const popoverStyles = tv({
  base: [
    "absolute z-50 mt-1 w-full",
    "max-h-60 overflow-auto",
    "rounded-md border bg-white dark:bg-gray-900",
    "shadow-lg",
  ],
});
const optionStyles = tv({
  base: [
    "px-3 py-2 cursor-pointer select-none",
    "text-sm",
    "hover:bg-gray-100 dark:hover:bg-gray-800",
    "aria-selected:bg-blue-600 aria-selected:text-white",
    "aria-current:bg-gray-100 dark:aria-current:bg-gray-800",
  ],
});

// --- Functional version with *one* effect
export default function SmartSelect(props: SmartSelectProps) {
  const {
    mode = "local",
    options = [],
    fetchOptions,
    freeInput = true,
    placeholder = "Select...",
    disabled = false,
    className,
    size = "middle",
    shape = "default",
    block = false,
    value,
    defaultValue,
    onChange,
  } = props;

  // minimal hooks: state + one effect
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    value ?? defaultValue ?? ""
  );
  const [items, setItems] = useState<SelectOption[]>(options);
  const [highlighted, setHighlighted] = useState(-1);
  const [loading, setLoading] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // single effect handles: outside click, controlled sync, local options sync
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(e.target as Node)) {
        setOpen(false);
        setHighlighted(-1);
      }
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, []);

  useEffect(() => {
    // controlled sync
    if (value !== undefined) setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (mode === "local") setItems(options);
  }, [options, mode]);

  const rootCls = selectStyles({ block });
  const inputCls = inputStyles({ size, shape });

  const setInput = (v: string) => {
    setInputValue(v);
    setOpen(true);
    if (mode === "server") queueSearch(v);
    else filterLocal(v);
    if (value !== undefined) onChange?.(v, null);
  };

  const filterLocal = (q: string) => {
    if (!q) {
      setItems(options.slice());
      return;
    }
    const lower = q.toLowerCase();
    setItems(
      options.filter((o) =>
        (o.label + " " + o.value).toLowerCase().includes(lower)
      )
    );
  };

  const queueSearch = (q: string) => {
    if (!fetchOptions) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetchOptions(q);
        setItems(res);
        setHighlighted(res.length ? 0 : -1);
      } finally {
        setLoading(false);
      }
    }, 250);
  };

  const commit = (v: string, opt: SelectOption | null) => {
    if (value === undefined) setInputValue(v);
    onChange?.(v, opt);
    setOpen(false);
    setHighlighted(-1);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(items.length - 1, h + 1));
      setOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(0, h - 1));
      setOpen(true);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = items[highlighted];
      if (it) commit(it.value, it);
      else if (freeInput) commit(inputValue, null);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const content = useMemo(
    () =>
      open && (
        <div
          id="smartselect-listbox"
          role="listbox"
          className={popoverStyles()}
        >
          {items.length ? (
            items.map((o, idx) => {
              const selected = o.value === inputValue;
              const current = idx === highlighted;
              return (
                <div
                  key={o.value}
                  role="option"
                  aria-selected={selected || undefined}
                  aria-current={current || undefined}
                  className={optionStyles()}
                  onMouseEnter={() => setHighlighted(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    commit(o.value, o);
                  }}
                >
                  {o.label}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              {loading
                ? "Chargement…"
                : freeInput
                ? "Aucun résultat — Entrée libre possible (Entrée)"
                : "Aucun résultat"}
            </div>
          )}
        </div>
      ),
    [open, items, inputValue, highlighted, loading]
  );

  return (
    <div className={cnBase(rootCls, className)} ref={rootRef}>
      <div className="relative">
        <input
          ref={inputRef}
          className={inputCls}
          placeholder={placeholder}
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="smartselect-listbox"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => !disabled && setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
          {loading ? (
            <span className="inline-block animate-spin rounded-full border-2 border-current border-r-transparent w-4 h-4" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.084l3.71-3.853a.75.75 0 011.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      {content}
    </div>
  );
}

// Examples remain the same as before (local/server) if you want to keep them.
