import React from 'react';
import clsx from 'clsx';

type Props = {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    placeholder?: string;
    type?: string;
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
    className?: string;
};

const CustomTextField: React.FC<Props> = ({
    label,
    value,
    onChange,
    name,
    placeholder,
    type = 'text',
    error = false,
    helperText,
    disabled = false,
    className = '',
}) => {
    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            )}
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={clsx(
                    "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none text-sm transition-all",
                    error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
                    disabled && "bg-gray-100 cursor-not-allowed"
                )}
            />
            {helperText && (
                <p className={clsx("mt-1 text-xs", error ? "text-red-500" : "text-gray-500")}>
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default CustomTextField;
