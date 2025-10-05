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

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  type?: ButtonType;
  color?: ButtonColorType;
  variant?: ButtonVariantType;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean | { delay?: number; icon?: React.ReactNode };
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  href?: string;
  htmlType?: "button" | "submit" | "reset";
  autoInsertSpace?: boolean;
  classNames?: { icon: string };
  styles?: { icon: React.CSSProperties };
  disableDefaultStyle?: boolean;
  [key: `data-${string}`]: string;
}
