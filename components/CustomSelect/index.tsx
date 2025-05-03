import { FormControl, Select, MenuItem, FormHelperText } from '@mui/material';

interface CustomSelectProps {
    label?: string;
    options: { _id: string; name: string }[];
    value: string;
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    error?: boolean;
    helperText?: string;
}

export default function CustomSelect({
    label = 'Danh mục khách sạn',
    options = [],
    value,
    onChange,
    error = false,
    helperText = ''
}: CustomSelectProps) {
    
    return (
        <div className="w-full font-work">
            <FormControl fullWidth error={error}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <Select
                    value={value || ''}
                    onChange={onChange}
                    displayEmpty
                    placeholder={label}
                    sx={{
                        borderRadius: '0.375rem',
                        fontFamily: '"Work Sans", sans-serif',
                        fontSize: '15px',
                        padding: '0',
                        '& .MuiSelect-select': {
                            padding: '8px 12px',
                        },
                    }}
                >
                    {options.map((opt) => (
                        <MenuItem
                            key={opt._id}
                            value={opt._id}
                            sx={{
                                fontFamily: '"Work Sans", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            {opt.name}
                        </MenuItem>
                    ))}
                </Select>
                {error && helperText && (
                    <FormHelperText>{helperText}</FormHelperText>
                )}
            </FormControl>
        </div>
    );
}
