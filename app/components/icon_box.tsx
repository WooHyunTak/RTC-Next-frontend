import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type IconProps = {
  name: IconProp;
  position?: "top" | "left";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  label?: string;
  onClick?: () => void;
};

function IconBox({ name, size, label, position, onClick }: IconProps) {
  const sizeProp = size ? size : "md";
  const positionProp = position ? position : "top";

  const positions = {
    top: "flex-col",
    left: "flex-row",
  };

  const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
  };

  const icon = <FontAwesomeIcon icon={name} className={sizes[sizeProp]} />;

  return (
    <div
      className={`flex w-full items-center ${positions[positionProp]} gap-4 hover:cursor-pointer hover:bg-blue-600 rounded-md p-2`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

export default IconBox;
