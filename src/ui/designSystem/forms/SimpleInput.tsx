import React from "react";
import clsx from "clsx";
import Typography from "../typography/typography";
import { FiAlertCircle } from "react-icons/fi";

interface SimpleInputProps {
  id?: string;
  name?: string;
  type?: "text" | "email" | "password" | "tel" | "number" | "url" | "date" | "textarea";
  label?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  rows?: number;
  min?: number;
  max?: number;
  step?: number | string;
  autoComplete?: string;
  "aria-label"?: string;
}

export const SimpleInput = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  error,
  className,
  rows = 4,
  min,
  max,
  step,
  autoComplete,
  "aria-label": ariaLabel,
}: SimpleInputProps) => {
  const hasError = !!error;
  const inputId = id || name;

  const baseClasses = clsx(
    "w-full px-3 py-2 font-light border text-gray-600 rounded-md transition-all duration-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1",
    {
      "cursor-not-allowed bg-gray-100": disabled,
      "border-danger focus:ring-danger focus:border-danger": hasError,
      "border-gray-300 focus:ring-primary focus:border-primary": !hasError,
    },
    className
  );

  const InputComponent = type === "textarea" ? "textarea" : "input";

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-900">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}

      <div className="relative">
        {InputComponent === "textarea" ? (
          <textarea
            id={inputId}
            name={name}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            rows={rows}
            className={baseClasses}
            aria-label={ariaLabel || label}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            autoComplete={autoComplete}
            className={baseClasses}
            aria-label={ariaLabel || label}
          />
        )}
      </div>

      {hasError && (
        <div className="flex gap-1 items-center animate-fadeIn">
          <FiAlertCircle className="flex-shrink-0 text-danger" size={14} />
          <Typography
            theme="red"
            variant="body-sm"
            component="div"
            className="text-sm text-red-600">
            {error}
          </Typography>
        </div>
      )}
    </div>
  );
};

