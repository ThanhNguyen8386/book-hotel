import { TextField } from '@mui/material';

interface CurrencyInputProps {
    label: string;
    name: string;
    value: number;
    onChange: (name: string, value: number) => void;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN').format(value);

export default function CurrencyInput({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    placeholder,
}: CurrencyInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replaceAll('.', '').replace(/\D/g, '');
        const numberValue = parseInt(raw || '0', 10);
        onChange(name, numberValue);
    };

    return (
        <div className="w-full space-y-1 font-work">
            <label className="block text-sm font-medium text-gray-800 font-work">{label}</label>
            <TextField
                name={name}
                fullWidth
                variant="outlined"
                value={value === 0 ? '' : formatCurrency(value)}
                onChange={handleChange}
                placeholder={placeholder}
                error={error}
                helperText={helperText}
                inputProps={{
                    inputMode: 'numeric',
                    className: 'py-2 text-sm font-work', 
                }}
                className="rounded-md [&>div]:rounded-md font-work"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        fontFamily: 'Work Sans, sans-serif',
                        fontSize: '0.875rem',
                        minHeight: '40px', 
                        '&.Mui-focused fieldset': {
                            borderColor: '#000',
                        },
                    },
                    '& .MuiInputBase-input': {
                        padding: '10px 12px',
                    },
                }}
            />
        </div>
    );
}
