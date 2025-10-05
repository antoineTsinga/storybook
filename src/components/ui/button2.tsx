import React from "react";

type ButtonColorType =
  | "primary"
  | "danger"
  | "default"
  | "pink"
  | "purple"
  | "cyan"
  | string;
type ButtonVariantType =
  | "solid"
  | "outline"
  | "dashed"
  | "filled"
  | "text"
  | "link";
type SizeType = "small" | "middle" | "large";
type ButtonShape = "default" | "circle" | "round";

interface ButtonProps {
  type?: "button" | "submit" | "reset"; // HTML button types
  color?: ButtonColorType; // Couleur du bouton
  variant?: ButtonVariantType; // Variante du bouton
  icon?: React.ReactNode; // Icône à afficher sur le bouton
  iconPosition?: "start" | "end"; // Position de l'icône
  shape?: ButtonShape; // Forme du bouton (par défaut, circle, round)
  size?: SizeType; // Taille du bouton
  disabled?: boolean; // Si le bouton est désactivé
  loading?: boolean | { delay: number; icon: React.ReactNode }; // Etat de chargement
  block?: boolean; // Si le bouton occupe toute la largeur de son parent
  danger?: boolean; // Si le bouton est de type danger (rouge)
  ghost?: boolean; // Si le bouton est en mode "ghost" (transparent)
  className?: string; // Classe personnalisée
  children?: React.ReactNode; // Contenu du bouton
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Gestion du clic
  style?: React.CSSProperties; // Styles personnalisés
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  color = "default",
  variant = "solid",
  icon,
  iconPosition = "start",
  shape = "default",
  size = "middle",
  disabled = false,
  loading = false,
  block = false,
  danger = false,
  ghost = false,
  children,
  onClick,
  className,
  style,
}) => {
  // Définition des classes de Tailwind CSS selon la variante et la couleur
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    middle: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const variantClasses: Record<ButtonVariantType, string> = {
    solid: "text-white hover:text-white",
    outline: "border-2 text-blue-600 border-blue-600 hover:bg-blue-100",
    dashed:
      "border-2 border-dashed text-blue-600 border-blue-600 hover:bg-blue-100",
    filled: "bg-blue-600 text-white hover:bg-blue-700",
    text: "text-blue-600 hover:bg-blue-100",
    link: "text-blue-600 underline hover:bg-transparent",
  };

  const colorClasses: Record<ButtonColorType, string> = {
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    pink: "bg-pink-600 text-white hover:bg-pink-700",
    purple: "bg-purple-600 text-white hover:bg-purple-700",
    cyan: "bg-cyan-600 text-white hover:bg-cyan-700",
  };

  // Forme du bouton
  const shapeClasses = {
    default: "rounded",
    circle: "rounded-full",
    round: "rounded-lg",
  };

  // Condition pour gérer le bouton en mode "ghost"
  const ghostClass = ghost ? "bg-transparent text-blue-600" : "";

  // Position de l'icône
  const iconPositionClass = iconPosition === "start" ? "mr-2" : "ml-2";

  // État de chargement
  const isLoading = !!loading;
  const loadingIcon =
    isLoading && typeof loading === "boolean" ? (
      <span className="animate-spin">🔄</span>
    ) : isLoading && "icon" in (loading as object) ? (
      (loading as { icon: React.ReactNode }).icon
    ) : null;

  // Définition des classes combinées pour le bouton
  const buttonClasses = `
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    ${colorClasses[color]} 
    ${shapeClasses[shape]} 
    ${ghostClass}
    ${block ? "w-full" : ""}
    ${className}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
    ${danger ? "bg-red-600 text-white" : ""}
    transition-all
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={style}
    >
      {loadingIcon
        ? loadingIcon
        : icon &&
          iconPosition === "start" && (
            <span className={`${iconPositionClass}`}>{icon}</span>
          )}
      {children}
      {icon && iconPosition === "end" && (
        <span className={`${iconPositionClass}`}>{icon}</span>
      )}
    </button>
  );
};

export default Button;
