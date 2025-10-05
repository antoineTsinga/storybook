import React from "react";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import type {
  ButtonProps,
  ButtonColorType,
  ButtonVariantType,
  ButtonType,
} from "./types";
import Group from "./button-group.tsx";

/**
 * Readability-first version
 * - No forwardRef; explicit `elementRef` prop
 * - Clear variant blocks; consistent focus ring by color (Option A: explicit entries)
 * - Useful data-* attributes and a11y (aria-busy)
 */

// Centralize focus ring per color
const RING: Record<ButtonColorType, string> = {
  blue: "focus:ring-blue-600 dark:focus:ring-blue-700",
  green: "focus:ring-green-600 dark:focus:ring-green-700",
  red: "focus:ring-red-600 dark:focus:ring-red-700",
  gray: "focus:ring-gray-600 dark:ring-gray-700",
};

const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "font-medium",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ],
  variants: {
    size: {
      small: "px-3 py-1 text-sm",
      middle: "px-4 py-2 text-base",
      large: "px-5 py-2.5 text-lg",
    },
    shape: {
      default: "rounded-md",
      round: "rounded-full",
      circle: "rounded-[100%] justify-center",
    },
    block: {
      true: "w-full",
      false: "w-fit",
    },

    // Fallback `type` styles (only applied when no color+variant provided)
    type: {
      default:
        "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
      dashed:
        "border border-dashed border-blue-500 text-blue-500 bg-transparent dark:border-blue-400 dark:text-blue-400",
      text: "bg-transparent text-blue-600 hover:underline dark:text-blue-400",
      link: "bg-transparent text-blue-600 underline dark:text-blue-400",
    },

    // Explicit variant/color axes so tv can combine
    variant: {
      solid: "",
      outlined: "",
      dashed: "",
      filled: "",
      text: "",
      link: "",
    },
    color: {
      blue: "",
      green: "",
      red: "",
      gray: "",
    },

    ghost: {
      true: "bg-transparent border border-current",
      false: "",
    },
    danger: {
      true: "",
      false: "",
    },

    disableDefaultStyle: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    // --- Danger styles
    {
      danger: true,
      ghost: false,
      disableDefaultStyle: false,
      class:
        "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
    },
    {
      danger: true,
      ghost: true,
      disableDefaultStyle: false,
      class:
        "border border-red-500 text-red-500 bg-transparent dark:border-red-400 dark:text-red-400",
    },
    // Ghost-only (non-danger)
    {
      ghost: true,
      danger: false,
      disableDefaultStyle: false,
      class: "bg-transparent border border-current",
    },

    // --- Variant × Color matrix (base skins) ---
    // Solid
    { variant: "solid", color: "blue", disableDefaultStyle: false, class: "bg-blue-600 text-white enabled:hover:bg-blue-700 dark:bg-blue-700 dark:enabled:hover:bg-blue-600" }, //prettier-ignore
    { variant: "solid", color: "green", disableDefaultStyle: false, class: "bg-green-600 text-white enabled:hover:bg-green-700 dark:bg-green-700 dark:enabled:hover:bg-green-600" }, //prettier-ignore
    { variant: "solid", color: "red", disableDefaultStyle: false, class: "bg-red-600 text-white enabled:hover:bg-red-700 dark:bg-red-700 dark:enabled:hover:bg-red-600" }, //prettier-ignore
    { variant: "solid", color: "gray", disableDefaultStyle: false, class: "bg-gray-600 text-white enabled:hover:bg-gray-700 dark:bg-gray-700 dark:enabled:hover:bg-gray-600" }, //prettier-ignore

    // Outlined
    { variant: "outlined", color: "blue", disableDefaultStyle: false, class: "border border-blue-500 text-blue-500 bg-transparent dark:border-blue-400 dark:text-blue-400" }, //prettier-ignore
    { variant: "outlined", color: "green", disableDefaultStyle: false, class: "border border-green-500 text-green-500 bg-transparent dark:border-green-400 dark:text-green-400" }, //prettier-ignore
    { variant: "outlined", color: "red", disableDefaultStyle: false, class: "border border-red-500 text-red-500 bg-transparent dark:border-red-500 dark:text-red-500" }, //prettier-ignore
    { variant: "outlined", color: "gray", disableDefaultStyle: false, class: "border border-gray-500 text-gray-500 bg-transparent dark:border-gray-400 dark:text-gray-400" }, //prettier-ignore

    // Dashed
    { variant: "dashed", color: "blue", disableDefaultStyle: false, class: "border border-dashed border-blue-500 text-blue-500 bg-transparent dark:border-blue-400 dark:text-blue-400" }, //prettier-ignore
    { variant: "dashed", color: "green", disableDefaultStyle: false, class: "border border-dashed border-green-500 text-green-500 bg-transparent dark:border-green-400 dark:text-green-400" }, //prettier-ignore
    { variant: "dashed", color: "red", disableDefaultStyle: false, class: "border border-dashed border-red-500 text-red-500 bg-transparent dark:border-red-500 dark:text-red-500" }, //prettier-ignore
    { variant: "dashed", color: "gray", disableDefaultStyle: false, class: "border border-dashed border-gray-500 text-gray-500 bg-transparent dark:border-gray-400 dark:text-gray-400" }, //prettier-ignore

    // Filled (soft)
    { variant: "filled", color: "blue", disableDefaultStyle: false, class: "bg-blue-100 text-blue-800 dark:bg-blue-800/60 dark:text-blue-300" }, //prettier-ignore
    { variant: "filled", color: "green", disableDefaultStyle: false, class: "bg-green-100 text-green-800 dark:bg-green-800/60 dark:text-green-300" }, //prettier-ignore
    { variant: "filled", color: "red", disableDefaultStyle: false, class: "bg-red-100 text-red-800 dark:bg-red-800/60 dark:text-red-300" }, //prettier-ignore
    { variant: "filled", color: "gray", disableDefaultStyle: false, class: "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300" }, //prettier-ignore

    // Text
    { variant: "text", color: "blue", disableDefaultStyle: false, class: "bg-transparent text-blue-800 enabled:hover:bg-blue-100 dark:text-blue-400 dark:enabled:hover:bg-blue-800 dark:enabled:hover:text-blue-300" }, //prettier-ignore
    { variant: "text", color: "green", disableDefaultStyle: false, class: "bg-transparent text-green-800 enabled:hover:bg-green-100 dark:text-green-500 dark:enabled:hover:bg-green-800 dark:enabled:hover:text-green-300" }, //prettier-ignore
    { variant: "text", color: "red", disableDefaultStyle: false, class: "bg-transparent text-red-800 enabled:hover:bg-red-100 dark:text-red-500 dark:enabled:hover:bg-red-800 dark:enabled:hover:text-red-300" }, //prettier-ignore
    { variant: "text", color: "gray", disableDefaultStyle: false, class: "bg-transparent text-gray-800 enabled:hover:bg-gray-100 dark:text-gray-400 dark:enabled:hover:bg-gray-800 dark:enabled:hover:text-gray-300" }, //prettier-ignore

    // Link (keep underline only)
    { variant: "link", color: "blue", disableDefaultStyle: false, class: "bg-transparent text-blue-600 underline dark:text-blue-400" }, //prettier-ignore
    { variant: "link", color: "green", disableDefaultStyle: false, class: "bg-transparent text-green-600 underline dark:text-green-500" }, //prettier-ignore
    { variant: "link", color: "red", disableDefaultStyle: false, class: "bg-transparent text-red-600 underline dark:text-red-500" }, //prettier-ignore
    { variant: "link", color: "gray", disableDefaultStyle: false, class: "bg-transparent text-gray-600 underline dark:text-gray-400" }, //prettier-ignore

    // --- Consistent focus ring per color (explicit, not generated) ---
    { variant: "solid",    color: "blue",  disableDefaultStyle: false, class: RING.blue  }, //prettier-ignore
    { variant: "outlined", color: "blue",  disableDefaultStyle: false, class: RING.blue  }, //prettier-ignore
    { variant: "dashed",   color: "blue",  disableDefaultStyle: false, class: RING.blue  }, //prettier-ignore
    { variant: "filled",   color: "blue",  disableDefaultStyle: false, class: RING.blue  }, //prettier-ignore
    { variant: "text",     color: "blue",  disableDefaultStyle: false, class: RING.blue  }, //prettier-ignore

    { variant: "solid",    color: "green", disableDefaultStyle: false, class: RING.green }, //prettier-ignore
    { variant: "outlined", color: "green", disableDefaultStyle: false, class: RING.green }, //prettier-ignore
    { variant: "dashed",   color: "green", disableDefaultStyle: false, class: RING.green }, //prettier-ignore
    { variant: "filled",   color: "green", disableDefaultStyle: false, class: RING.green }, //prettier-ignore
    { variant: "text",     color: "green", disableDefaultStyle: false, class: RING.green }, //prettier-ignore

    { variant: "solid",    color: "red",   disableDefaultStyle: false, class: RING.red   }, //prettier-ignore
    { variant: "outlined", color: "red",   disableDefaultStyle: false, class: RING.red   }, //prettier-ignore
    { variant: "dashed",   color: "red",   disableDefaultStyle: false, class: RING.red   }, //prettier-ignore
    { variant: "filled",   color: "red",   disableDefaultStyle: false, class: RING.red   }, //prettier-ignore
    { variant: "text",     color: "red",   disableDefaultStyle: false, class: RING.red   }, //prettier-ignore

    { variant: "solid",    color: "gray",  disableDefaultStyle: false, class: RING.gray  }, //prettier-ignore
    { variant: "outlined", color: "gray",  disableDefaultStyle: false, class: RING.gray  }, //prettier-ignore
    { variant: "dashed",   color: "gray",  disableDefaultStyle: false, class: RING.gray  }, //prettier-ignore
    { variant: "filled",   color: "gray",  disableDefaultStyle: false, class: RING.gray  }, //prettier-ignore
    { variant: "text",     color: "gray",  disableDefaultStyle: false, class: RING.gray  }, //prettier-ignore
  ],
  defaultVariants: {
    size: "middle",
    shape: "default",
    block: false,
    type: "default",
    disableDefaultStyle: false,
  },
});

// Component without forwardRef
const InternalButton: React.FC<ButtonProps> = (props) => {
  const {
    type = "default",
    htmlType = "button",
    color,
    variant,
    icon,
    iconPosition = "start",
    shape = "default",
    size = "middle",
    disabled = false,
    loading = false,
    className = "",
    ghost = false,
    danger = false,
    block = false,
    children,
    href,
    styles,
    disableDefaultStyle = false,
    elementRef,
    ...restProps
  } = props as ButtonProps & {
    elementRef?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
  };

  const isLoading = Boolean(loading);
  const loadingIcon = typeof loading === "object" ? loading.icon : null;
  const iconElement = isLoading
    ? loadingIcon ?? (
        <span className="inline-block animate-spin rounded-full border-2 border-current border-r-transparent w-4 h-4" />
      )
    : icon;

  const isLink = Boolean(href);
  const hasVariantColor = Boolean(color && variant);

  const cls = buttonStyles({
    size,
    shape,
    block: !!block,
    ghost: !!ghost,
    danger: !!danger,
    disableDefaultStyle,
    type:
      hasVariantColor || disableDefaultStyle ? undefined : (type as ButtonType),
    variant: disableDefaultStyle
      ? undefined
      : (variant as ButtonVariantType | undefined),
    color: disableDefaultStyle
      ? undefined
      : (color as ButtonColorType | undefined),
  });

  const composed = twMerge(cls, className);

  const content = (
    <>
      {iconPosition === "start" && iconElement}
      {children && <span className="inline-flex">{children}</span>}
      {iconPosition === "end" && iconElement}
    </>
  );

  if (isLink) {
    const anchorProps =
      restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        className={composed}
        ref={elementRef as React.Ref<HTMLAnchorElement>}
        aria-disabled={disabled || undefined}
        aria-busy={isLoading || undefined}
        data-variant={variant}
        data-color={color}
        data-type={type}
        data-size={size}
        data-shape={shape}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const buttonProps =
    restProps as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={htmlType}
      className={composed}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      ref={elementRef as React.Ref<HTMLButtonElement>}
      data-variant={variant}
      data-color={color}
      data-type={type}
      data-size={size}
      data-shape={shape}
      {...buttonProps}
    >
      {content}
    </button>
  );
};

InternalButton.displayName = "Button";

type CompoundedButton = React.FC<ButtonProps> & { Group: typeof Group };
const Button = InternalButton as CompoundedButton;
Button.Group = Group;

export default Button;
