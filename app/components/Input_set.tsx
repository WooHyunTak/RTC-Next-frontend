import { InputHTMLAttributes } from "react";

interface InputSetProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const InputSet = ({ label, id, error, onKeyPress, ...props }: InputSetProps) => {
  return (
    <div className="mb-4 flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        {...props}
        onKeyUp={onKeyPress}
      />
      <p className=" text-sm text-error-500">{error}</p>
    </div>
  );
};
