import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface ButtonSetProps {
  icon: IconProp;
  color?: Color;
  label: string;
  size?: "sm" | "md" | "lg";
  clicked?: boolean;
  handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

type Color = "blue" | "red" | "green";

function ButtonSet({
  icon,
  color = "blue",
  label,
  handleClick,  
  size = "md",
  clicked = true,
  className = "",
}: ButtonSetProps) {
  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  };

  const colors = {
    blue: "bg-blue-500 text-white",
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white"
  };

  const leftIcon = <FontAwesomeIcon icon={icon} className={sizes[size]} />;

  return (
    <div
      className={`flex ${colors[color]} ${clicked ? "hover:cursor-pointer" : ""} items-center justify-between rounded-md gap-2 p-2 ${className}`}
      onClick={handleClick}
    >
      <button className={`rounded-md flex items-center gap-2`} disabled={!clicked}>
        {leftIcon}
      </button>
      <span className={`flex-1 ${sizes[size]}`}>{label}</span>
    </div>
  );
}

export default ButtonSet;
