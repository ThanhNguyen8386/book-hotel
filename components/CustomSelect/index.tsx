import { FormControl, Select, MenuItem } from '@mui/material';

interface CustomSelectProps {
    label?: string;
    options: { value: string; label: string }[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}export default function CustomSelect({ label = 'Danh mục khách sạn', options = [], value, onChange }: CustomSelectProps) {
    return (
        <div className="w-full font-work">
            <FormControl fullWidth>
                <Select
                    value={value || ''} // Sử dụng prop value từ AddCategory
                    onChange={onChange} // Gọi prop onChange khi giá trị thay đổi
                    displayEmpty
                    sx={{
                        borderRadius: '0.375rem',
                        fontFamily: '"Work Sans", sans-serif',
                        fontSize: '15px',
                        padding: '0',
                        '& .MuiSelect-select': {
                            padding: '8px 12px 8px 12px',
                        },
                    }}
                >
                    {options.map((opt) => (
                        <MenuItem
                            key={opt.value}
                            value={opt.value}
                            sx={{
                                fontFamily: '"Work Sans", sans-serif',
                                fontSize: '15px',
                            }}
                        >
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}