import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg" | "full";
  variant?: "primary" | "secondary" | "danger";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  children,
  size = "md",
  variant = "primary",
  onClick,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    full: "w-full px-4 py-2 text-base",
  };

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  };

  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${
    variantStyles[variant]
  } ${className || ""}`;

  return (
    <button className={buttonStyles} {...props} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
