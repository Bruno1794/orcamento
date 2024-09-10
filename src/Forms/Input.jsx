import React from 'react';

const Input = ({id, label, onChange, value, type, onBlur, error, autoComplete,disabled}) => {

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete={autoComplete}
                disabled={disabled}
            />
                 {error && <p>{error}</p>}

        </>
    );
};

export default Input;