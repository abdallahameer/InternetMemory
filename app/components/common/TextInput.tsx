"use client";

import React from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  autoComplete?: string;
  name?: string;
}

export default function TextInput({
  label,
  placeholder = "Enter text",
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  icon,
  autoComplete,
  name,
}: TextInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`w-full px-4 py-2.5 rounded-lg bg-slate-800 border text-white placeholder-slate-500 transition-colors focus:outline-none ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-700 focus:border-purple-500"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${
            icon ? "pl-10" : ""
          }`}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
