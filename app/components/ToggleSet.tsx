'use client'

import { InputHTMLAttributes } from "react";
import Toggle from "./Toggle";

type ToggleSize = 'sm' | 'md' | 'lg'

interface ToggleSetProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  id: string;
  size?: ToggleSize;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ToggleSet({ label, id, size = "md", handleChange, ...props }: ToggleSetProps) {
  return (
    <div className="flex justify-between items-center gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <Toggle id={id} size={size} handleChange={e => handleChange(e)} {...props} />
    </div>
  );
}

export default ToggleSet;