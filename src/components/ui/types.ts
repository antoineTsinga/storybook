import type React from "react";

export type ButtonType = "link" | "text" | "default" | "primary" | "dashed";
export type ButtonVariantType =
  | "link"
  | "text"
  | "solid"
  | "outlined"
  | "dashed"
  | "filled";
export type ButtonColorType = "blue" | "green" | "red" | "gray";
export type ButtonShape = "circle" | "default" | "round";
export type SizeType = "small" | "middle" | "large";

// Props partagées quel que soit l'élément rendu
export type SharedButtonProps = {
  type?: ButtonType;
  color?: ButtonColorType;
  variant?: ButtonVariantType;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean | { delay?: number; icon?: React.ReactNode };
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  styles?: { icon?: React.CSSProperties };
  disableDefaultStyle?: boolean;
  // ref sans forwardRef
  elementRef?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
  [key: `data-${string}`]: string;
};

// Variante <a> si href est présent => expose target/rel/download etc.
export type ButtonAsAnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "color"
> &
  SharedButtonProps & {
    href: string;
    htmlType?: never;
  };

// Variante <button> sinon => expose type/disabled/form etc.
export type ButtonAsButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "color"
> &
  SharedButtonProps & {
    href?: undefined;
    htmlType?: "button" | "submit" | "reset";
  };

export type ButtonProps = ButtonAsAnchorProps | ButtonAsButtonProps;
