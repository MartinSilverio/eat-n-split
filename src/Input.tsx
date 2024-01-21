import { CSSProperties, ChangeEvent, ReactNode } from 'react';

export interface InputProps {
    children: ReactNode;
    type: string;
    value: string;
    onChange?: (s: string) => void;
    disabled?: boolean;
}

export function Input({
    children,
    type,
    value,
    onChange,
    disabled,
}: InputProps) {
    const style: CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        onChange?.(e.target.value);
    }

    return (
        <div style={style}>
            <label>{children}</label>
            <input
                style={{ borderRadius: '4px', border: 'none' }}
                type={type}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
        </div>
    );
}
