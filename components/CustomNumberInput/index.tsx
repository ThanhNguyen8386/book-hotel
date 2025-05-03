import React from 'react';
import { TextField } from '@mui/material';
import clsx from 'clsx';

type Props = {
    label?: string;
    value: number | string;
    onChange: (val: number) => void;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
    min?: number;
    max?: number;
};

const formatNumber = (value: number | string) => {
    const num = Number(value);
    return isNaN(num) ? '' : num.toLocaleString('vi-VN');
};

const parseNumber = (value: string) => {
    const parsed = value.replace(/[^\d]/g, '');
    return Number(parsed);
};

const CustomNumberInput: React.FC<Props> = ({
    label,
    value,
    onChange,
    error = false,
    helperText = '',
    placeholder = '',
    name,
    disabled = false,
    className = '',
    min,
    max,
}) => {
    const [displayValue, setDisplayValue] = React.useState(formatNumber(value));

    React.useEffect(() => {
        setDisplayValue(formatNumber(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const parsed = parseNumber(rawValue);
        if (!isNaN(parsed)) {
            if ((min !== undefined && parsed < min) || (max !== undefined && parsed > max)) {
                return;
            }
            onChange(parsed);
        }
        setDisplayValue(rawValue);
    };

    return (
        <div className={clsx('w-full', className)}>
            {label && <label className="block text-sm font-semibold mb-1 text-gray-800">{label}</label>}
            <TextField
                variant="outlined"
                fullWidth
                value={displayValue}
                onChange={handleChange}
                error={error}
                helperText={helperText}
                placeholder={placeholder}
                name={name}
                disabled={disabled}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputLabelProps={{ shrink: false }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '0.5rem', // bo tròn giống ảnh
                        backgroundColor: 'white',
                        paddingRight: 1,
                        paddingLeft: 1,
                    },
                    '& .MuiInputBase-input': {
                        padding: '10px 12px',
                    },
                    '& .MuiFormHelperText-root': {
                        marginLeft: 0,
                    },
                }}
            />
        </div>
    );
};

export default CustomNumberInput;
