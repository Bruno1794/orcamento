import React from 'react';

const Textare = ({id, label,value, setValue , ...props}) => {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <textarea id={id} cols="100" rows="10" value={value} onChange={({target}) => setValue(target.value)} {...props} />
        </>

    );
};

export default Textare;