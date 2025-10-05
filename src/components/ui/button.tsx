import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import type {
  ButtonProps,
  ButtonColorType,
  ButtonVariantType,
  ButtonType,
} from "./types";
import Group from "./button-group.tsx";

// --- Fonction utilitaire pour les variantes + couleurs ---
const getVariantClasses = (
  variant?: ButtonVariantType,
  color?: ButtonColorType
) => {
  if (!color || !variant) return null;

  const styles: Record<ButtonVariantType, Record<ButtonColorType, string>> = {
    solid: {
      blue: "bg-blue-600 text-white enabled:hover:bg-blue-700 dark:bg-blue-700 dark:enabled:hover:bg-blue-600 focus:ring-blue-600 dark:focus:ring-blue-700",
      green:
        "bg-green-600 text-white enabled:hover:bg-green-700 dark:bg-green-700 dark:enabled:hover:bg-green-600 focus:ring-green-600 dark:focus:ring-green-700",
      red: "bg-red-600 text-white enabled:hover:bg-red-700 dark:bg-red-700 dark:enabled:hover:bg-red-600 focus:ring-red-600 dark:focus:ring-red-700",
      gray: "bg-gray-600 text-white enabled:hover:bg-gray-700 dark:bg-gray-700 dark:enabled:hover:bg-gray-600 focus:ring-gray-600 dark:ring-gray-700",
    },
    outlined: {
      blue: "border border-blue-500 text-blue-500 bg-transparent dark:border-blue-400 dark:text-blue-400",
      green:
        "border border-green-500 text-green-500 bg-transparent dark:border-green-400 dark:text-green-400",
      red: "border border-red-500 text-red-500 bg-transparent dark:border-red-500 dark:text-red-500",
      gray: "border border-gray-500 text-gray-500 bg-transparent dark:border-gray-400 dark:text-gray-400",
    },
    dashed: {
      blue: "border border-dashed border-blue-500 text-blue-500 bg-transparent dark:border-blue-400 dark:text-blue-400",
      green:
        "border border-dashed border-green-500 text-green-500 bg-transparent dark:border-green-400 dark:text-green-400",
      red: "border border-dashed border-red-500 text-red-500 bg-transparent dark:border-red-500 dark:text-red-500",
      gray: "border border-dashed border-gray-500 text-gray-500 bg-transparent dark:border-gray-400 dark:text-gray-400",
    },
    filled: {
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-800/60 dark:text-blue-300",
      green:
        "bg-green-100 text-green-800 dark:bg-green-800/60 dark:text-green-300",
      red: "bg-red-100 text-red-800 dark:bg-red-800/60 dark:text-red-300",
      gray: "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300",
    },
    text: {
      blue: "bg-transparent text-blue-800 enabled:hover:bg-blue-100 dark:text-blue-400 dark:enabled:hover:bg-blue-800 dark:enabled:hover:text-blue-300",
      green:
        "bg-transparent text-green-800 enabled:hover:bg-green-100 dark:text-green-500 dark:enabled:hover:bg-green-800 dark:enabled:hover:text-green-300",
      red: "bg-transparent text-red-800 enabled:hover:bg-red-100 dark:text-red-500 dark:enabled:hover:bg-red-800 dark:enabled:hover:text-red-300",
      gray: "bg-transparent text-gray-800 enabled:hover:bg-gray-100 dark:text-gray-400 dark:enabled:hover:bg-gray-800 dark:enabled:hover:text-gray-300",
    },
    link: {
      blue: "bg-transparent text-blue-600 underline dark:text-blue-400",
      green: "bg-transparent text-green-600 underline dark:text-green-500",
      red: "bg-transparent text-red-600 underline dark:text-red-500",
      gray: "bg-transparent text-gray-600 underline dark:text-gray-400",
    },
  };

  return styles[variant]?.[color] || null;
};

// --- Le composant Button ---
const InternalButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
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
    ...restProps
  } = props;

  const isLoading = Boolean(loading);
  const loadingIcon = typeof loading === "object" ? loading.icon : null;
  const iconElement = isLoading
    ? loadingIcon ?? (
        <span className="inline-block animate-spin rounded-full border-2 border-current border-r-transparent w-4 h-4" />
      )
    : icon;

  const isLink = !!href;

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    middle: "px-4 py-2 text-base",
    large: "px-5 py-2.5 text-lg",
  };

  const shapeClasses = {
    default: "rounded-md",
    round: "rounded-full",
    circle: "rounded-[100%] justify-center",
  };

  const typeClassMap: Record<ButtonType, string> = {
    default:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
    dashed:
      "border border-dashed border-blue-500 text-blue-500 bg-transparent dark:border-blue-400 dark:text-blue-400",
    text: "bg-transparent text-blue-600 hover:underline dark:text-blue-400",
    link: "bg-transparent text-blue-600 underline dark:text-blue-400",
  };

  const cls = twMerge([
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-60 ",
    sizeClasses[size],
    shapeClasses[shape],
    block && "w-full",
    !block && "w-fit",

    !disableDefaultStyle &&
      danger &&
      !ghost &&
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",

    !disableDefaultStyle &&
      danger &&
      ghost &&
      "border border-red-500 text-red-500 bg-transparent dark:border-red-400 dark:text-red-400",

    !disableDefaultStyle &&
      ghost &&
      !danger &&
      "bg-transparent border border-current",

    !disableDefaultStyle &&
      color &&
      variant &&
      getVariantClasses(variant, color),

    !disableDefaultStyle && !color && typeClassMap[type],

    className,
  ]);

  const content = (
    <>
      {iconPosition === "start" && iconElement}
      {children && <span className="inline-flex">{children}</span>}
      {iconPosition === "end" && iconElement}
    </>
  );

  if (isLink) {
    return (
      <a
        href={href}
        className={cls}
        ref={ref as React.Ref<HTMLAnchorElement>}
        aria-disabled={disabled}
        {...restProps}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={htmlType}
      className={cls}
      disabled={disabled || isLoading}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...restProps}
    >
      {content}
    </button>
  );
});

InternalButton.displayName = "Button";

// --- Typage composé : on ajoute .Group proprement ---
type CompoundedButton = typeof InternalButton & {
  Group: typeof Group;
};

const Button = InternalButton as CompoundedButton;
Button.Group = Group;

export default Button;
