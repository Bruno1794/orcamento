import React from 'react';

const UseFetch = () => {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);

   async function fetchData(url, options) {

        const response = await fetch(url);
        const dados = await response.json();
        setData(dados);
    }

    return [
        error,
        loading,
        data,
        fetchData
    ]
};

export default UseFetch;