import React from 'react';

const types = {
    cep: {
        regex: /^\d{5}-?\d{3}$/,
        message: 'Campo CEP invalido',

    },
    email: {
        regex: /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/,
        message: 'Email invalido',
    },
    fone: {
        regex: /^\([1-9]{2}\) 9[7-9]{1}[0-9]{3}\-[0-9]{4}$/,
        message: 'Informe um telefone valido'
    }
}

const UseForm = (type) => {
    const [value, setValue] = React.useState('');
    const[dadosCep , setDadosCep] = React.useState(null);
    const [error, setError] = React.useState(null);

    async function buscaCep(cep) {
        const dados = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await dados.json()
        setDadosCep(data)
    }

    function validate(value) {
        if (type === false) return true;
        if (type === 'cep' && types[type].regex.test(value)) buscaCep(value)
        setDadosCep(null)

        if (value.length === 0) {
            setError("Preecha um valor");
            return false;

        } else if (types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        } else {
            setError(null);

            return true;

        }
    }

    function onChange({target}) {
        if (error) validate(target.value)
        setValue(target.value)

    }

    return {
        value, setValue, error,
        onChange,
        dadosCep,
        onBlur: () => validate(value),
        validate: () => validate(value)
    }
};

export default UseForm;