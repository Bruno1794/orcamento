import React from 'react';
import Input from "./Input.jsx";
import LayoutPdf from "../layoutPdf.jsx";
import Menu from "../Menu/Menu.jsx";


const Form = () => {
    const [nome, setNome] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [fone, setFone] = React.useState('');
    const [site, setSite] = React.useState('');
    const [cliente, setCliente] = React.useState('');
    const [endereco, setEndereco] = React.useState('');
    const [estado, setEstado] = React.useState('');
    const [cidade, setCidade] = React.useState('');
    const [cep, setCep] = React.useState('');
    const [foneCliente, setFoneCliente] = React.useState('');
    const [numeroOrcamento, setNumeroOrcamento] = React.useState('');
    const [dataOrcamento, setDataOrcamento] = React.useState('');
    const [formaPg, setFormadePg] = React.useState('');
    const [descricao, setDescricao] = React.useState('');
    const [produto, setProduto] = React.useState('');
    const [valor, setValor] = React.useState('');
    const [dados, setDados] = React.useState(null);
    const [resposta, setResposta] = React.useState(null);


    function handleSubmit(event) {
        event.preventDefault();
        const valor = document.querySelectorAll('input')
        const formObject = {};

        valor.forEach((value, key) => {
            formObject[value.id] = value.value;
        })
        setDados(formObject);

        fetch('http://127.0.0.1:8000/api/orcamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),

        })
            .then(res => res.json())
            .then(data => {
                setResposta(data)
            })
    }


    return (
        <>
            <Menu/>

            {!dados &&   <form onSubmit={handleSubmit}>
                <h1>DADOS DO EMISSOR</h1>
                <div>
                    <Input id="nome" label="Nome" value={nome} setValue={setNome}/>
                    <Input id="email" type="email" label="E-mail" value={email} setValue={setEmail}/>

                    <div className="gridDuas">
                        <div>
                            <Input id="fone" type="text" label="Telefone" value={fone} setValue={setFone}/>
                        </div>
                        <div>
                            <Input id="site" type="text" label="Site" value={site} setValue={setSite}/>
                        </div>
                    </div>


                </div>


                <h1>DADOS DO CLIENTE</h1>
                <Input id="cliente" type="text" label="Cliente" value={cliente} setValue={setCliente}/>

                <div className="gridDuas">
                    <div>
                        <Input id="endereco" type="text" label="Endereço" value={endereco} setValue={setEndereco}/>
                    </div>
                    <div>
                        <Input id="foneCliente" type="text" label="Telefone" value={foneCliente}
                               setValue={setFoneCliente}/>
                    </div>
                </div>

                <div className="gridTres">
                    <div>
                        <Input id="estado" type="text" label="Estado" value={estado} setValue={setEstado}/>
                    </div>

                    <div>
                        <Input id="cidade" type="text" label="Cidade" value={cidade} setValue={setCidade}/>
                    </div>

                    <div>
                        <Input id="cep" type="text" label="CEP" value={cep} setValue={setCep}/>
                    </div>
                </div>


                <h1>DADOS DO ORÇAMENTO</h1>
                <div className="gridTres">

                    <div>
                        <Input id="numeroOrcamento" type="text" label="Numero do Orçamento" value={numeroOrcamento}
                               setValue={setNumeroOrcamento}/>
                    </div>
                    <div>
                        <Input id="dataOrcamento" type="date" label="Data Orçamento" value={dataOrcamento}
                               setValue={setDataOrcamento}/>
                    </div>
                    <div>
                        <Input id="formaPg" type="text" label="Forma de Pagamento" value={formaPg}
                               setValue={setFormadePg}/>
                    </div>
                </div>


                <Input id="descricao" type="text" label="Descrição" value={descricao} setValue={setDescricao}/>

                <h1>PRODUTO / SERVIÇO</h1>
                <Input id="produto" type="text" label="Produto / Serviço" value={produto} setValue={setProduto}/>
                <Input id="valor" type="text" label="Valor a cobrar" value={valor} setValue={setValor}/>

                <button className="btnGerar">Gerar Orçamento</button>


            </form>}
            {dados && <LayoutPdf  dados={dados}/>}


        </>
    )

};

export default Form;