'use client'

import { InputHTMLAttributes } from 'react'

type ToggleSize = 'sm' | 'md' | 'lg'

interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  id: string
  label?: string
  size?: ToggleSize
  containerClassName?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const sizeClasses: Record<ToggleSize, { track: string; thumb: string }> = {
  sm: { track: 'w-10 h-6', thumb: 'w-5 h-5' },
  md: { track: 'w-12 h-7', thumb: 'w-6 h-6' },
  lg: { track: 'w-14 h-8', thumb: 'w-7 h-7' },
}

function Toggle({
  id,
  label,
  size = 'md',
  disabled,
  className,
  containerClassName,
  handleChange,
  ...props
}: ToggleProps) {
  const { track, thumb } = sizeClasses[size]

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-3 select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${containerClassName ?? ''}`}
    >
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}

      <span className="relative inline-block">
        <input
          id={id}
          type="checkbox"
          className="sr-only peer"
          disabled={disabled}
          {...props}
          onChange={e => handleChange(e)}
        />
        <span
          aria-hidden
          className={`block ${track} rounded-full bg-slate-600 transition-colors duration-200 ease-out
            peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/40 peer-focus:ring-offset-1
            peer-checked:bg-blue-600 ${className ?? ''}`}
        />
        <span
          aria-hidden
          className={`pointer-events-none absolute top-0.5 left-0.5 ${thumb} rounded-full bg-white shadow
            transition-all duration-200 ease-out
            peer-checked:left-auto peer-checked:right-0.5`}
        />
      </span>
    </label>
  )
}

export default Toggle


