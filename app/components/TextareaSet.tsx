"use client";

import { TextareaHTMLAttributes } from "react";

interface TextareaSetProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  maxLength?: number;
  error?: string;
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextareaSet({ label, id, error, onKeyPress, maxLength, handleChange, ...props }: TextareaSetProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={id}
        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        maxLength={maxLength}
        {...props}
        onKeyUp={onKeyPress}
        onChange={e => handleChange(e)}
      />
      <p className=" text-sm text-error-500">{error}</p>
    </div>
  );
}

export default TextareaSet;
