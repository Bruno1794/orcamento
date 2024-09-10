import React from 'react';
import Menu from "./Menu/Menu.jsx";
import LayoutPdf from "./layoutPdf.jsx";
import Swal from "sweetalert2";

const Orcamento = () => {
    const [dados, setDados] = React.useState(null);
    const [pdf, setPdf] = React.useState(null);
    const [resposta, setResposta] = React.useState(null);

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/api/orcamento')
            .then(res => res.json())
            .then(data => setDados(data))

    }, [resposta])





    function handleClik({target}) {
        const id = target.value

        fetch(`http://127.0.0.1:8000/api/orcamento/${id}`)
            .then(res => res.json())
            .then(data => setPdf(data.orcamentos))
        setPdf(null)
    }

    function handleClikDelete(event) {
       Swal.fire({
            title: "Deseja Remover?",
            text: "Tem certeza que deseja remover o orçamento.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, deletar!"
        }).then((result) => {
            if (result.isConfirmed) {
                const id = event.target.value;
                fetch(`http://127.0.0.1:8000/api/orcamento/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => res.json())
                    .then(data => setResposta(data))
                    .then(Swal.fire({
                        title: "Deletado!",
                        text: "Registro deletado com sucesso.",
                        icon: "success"
                    }))


            }
        })


        /*const confirma = window.confirm("Tem certeza que deseja excluir?")
        if (confirma) {
            const id = event.target.value;
            fetch(`http://127.0.0.1:8000/api/orcamento/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json())
                .then(data => setResposta(data))
        }*/
    }

    /*
        console.log("06/09/2024".split('/').reverse().join('-'))
    */


    if (dados === null) return null
    return (
        <>
            <Menu/>

            {pdf && <LayoutPdf dados={pdf}/>}

            <div className="tabelaGeral">
                <h1>Lista de Orçamentos gerados</h1>
                <table className="tabela">
                    <thead>
                    <tr>
                        <th>Numero do Orçamento</th>
                        <th>Cliente</th>
                        <th>Data Validade</th>
                        <th>Valor</th>
                        <th>Ação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dados.orcamentos.map(({id, cliente, numeroOrcamento, dataOrcamento, valor}) =>
                        <tr key={id}>
                            <td>{numeroOrcamento}</td>
                            <td>{cliente}</td>
                            <td>{dataOrcamento.split('-').reverse().join('/')}</td>
                            <td>{valor}</td>
                            <td>
                                <button onClick={handleClik} value={id}>PDF</button>
                                <button onClick={handleClikDelete} value={id}>DELETE</button>
                            </td>
                        </tr>
                    )}
                    </tbody>

                </table>


            </div>
        </>
    );
};

export default Orcamento;