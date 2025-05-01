import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface ButtonSetProps {
  icon: IconProp;
  content: string;
  label: string;
  size?: "sm" | "md" | "lg";
  actionIcon?: {
    name: IconProp;
    onClick?: () => void;
  };
  onClick?: () => void;
}

function ButtonSet({
  icon,
  content,
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

  const leftIcon = <FontAwesomeIcon icon={icon} className={sizes[size]} />;
  const rightIcon = actionIcon ? (
    <FontAwesomeIcon icon={actionIcon.name} className={sizes[size]} />
  ) : null;

  return (
    <div
      className="flex items-center justify-between hover:cursor-pointer"
      onClick={onClick}
    >
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        {leftIcon}
      </button>
      <span className={`flex-1 ${sizes[size]}`}>{label}</span>
      {actionIcon && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={actionIcon.onClick}
        >
          {rightIcon}
        </button>
      )}
    </div>
  );
}

export default ButtonSet;
