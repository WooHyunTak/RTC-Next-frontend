import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface ButtonSetProps {
  icon: IconProp;
  color?: Color;
  label: string;
  size?: "sm" | "md" | "lg";
  actionIcon?: {
    name: IconProp;
    onClick?: () => void;
  };
  onClick?: () => void;
}

type Color = "blue" | "red" | "green";

function ButtonSet({
  icon,
  color = "blue",
  label,
  actionIcon,
  onClick,
  size = "md",
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
  const rightIcon = actionIcon ? (
    <FontAwesomeIcon icon={actionIcon.name} className={sizes[size]} />
  ) : null;

  return (
    <div
      className={`flex ${colors[color]} items-center justify-between hover:cursor-pointer hover:bg-blue-600 rounded-md gap-2 p-2`}
      onClick={onClick}
    >
      <button className={`rounded-md flex items-center gap-2`}>
        {leftIcon}
      </button>
      <span className={`flex-1 ${sizes[size]}`}>{label}</span>
      {actionIcon && (
        <button
          className={`${colors[color]} px-4 py-2 rounded-md flex items-center gap-2`}
          onClick={actionIcon.onClick}
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
}

export default ButtonSet;
