import React from 'react';
import Input from "./Input.jsx";
import LayoutPdf from "../layoutPdf.jsx";
import Menu from "../Menu/Menu.jsx";
import Textare from "./Textare.jsx";
import useForm from "../Hooks/useForm.jsx";


const Form = () => {

    const nome = useForm(false);
    const email = useForm('email');
    const fone = useForm('fone');
    const site = useForm(false);
    const cliente = useForm(false);
    const endereco = useForm(false);
    const estado = useForm(false);
    const cidade = useForm(false);
    const cep = useForm('cep');
    const foneCliente = useForm(false);
    const numeroOrcamento = useForm(false);
    const formaPg = useForm(false);
    const descricao = useForm(false);
    const produto = useForm(false);
    const dataOrcamento = useForm(false);
    const valor = useForm(false);
    const dataEmissao = useForm(false);

    const [dados, setDados] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [resposta, setResposta] = React.useState(null);
    const data = new Date();
    dataEmissao.value = data.toLocaleDateString().split('/').reverse().join('-')


    if (cep.dadosCep) {
        cidade.value = cep.dadosCep.localidade;
        estado.value = cep.dadosCep.estado;
    }


    function handleSubmit(event) {
        event.preventDefault();
        const valor = document.querySelectorAll('input')
        const valorArray = Array.from(valor);
        if (cep.validate() && email.validate()) {
            const retornoMap = valorArray.reduce((acc, atual) => {
                acc[atual.id] = atual.value
                return acc;
            }, {})
            setDados(retornoMap);


            fetch('http://127.0.0.1:8000/api/orcamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(retornoMap),

            })
                .then(res => res.json())
                .then(data => {
                    setResposta(data)
                })
        } else {
            setError("Existe Campos sem preecher!")


        }

    }


    return (
        <>
            <Menu/>


            {!dados && <form onSubmit={handleSubmit}>
                <h1>DADOS DO EMISSOR</h1>
                <div>
                    <Input id="nome" label="Nome" {...nome} autoComplete="true"/>

                    <Input id="dataEmissao" {...dataEmissao} type="hidden"/>
                    <Input id="email" type="email" label="E-mail" {...email} autoComplete="true"/>

                    <div className="gridDuas">
                        <div>
                            <Input id="fone" type="text" label="Telefone" {...fone} autoComplete="true"/>
                        </div>
                        <div>
                            <Input id="site" type="text" label="Site" {...site} autoComplete="true"/>
                        </div>
                    </div>


                </div>


                <h1>DADOS DO CLIENTE</h1>
                <Input id="cliente" type="text" label="Cliente" {...cliente} autoComplete="true"/>

                <div className="gridDuas">
                    <div>
                        <Input id="endereco" type="text" label="Endereço"  {...endereco} autoComplete="true"/>
                    </div>
                    <div>
                        <Input id="foneCliente" type="text" label="Telefone" {...foneCliente} autoComplete="true"/>
                    </div>
                </div>

                <div className="gridTres">
                    <div>
                        <Input id="estado" type="text" label="Estado" {...estado} autoComplete="true" disabled/>
                    </div>

                    <div>
                        <Input id="cidade" type="text" label="Cidade" {...cidade} autoComplete="true" disabled/>
                    </div>

                    <div>
                        <Input id="cep" type="text" label="CEP" {...cep} autoComplete="false"/>
                    </div>
                </div>


                <h1>DADOS DO ORÇAMENTO</h1>
                <div className="gridTres">

                    <div>
                        <Input id="numeroOrcamento" type="text" label="Numero do Orçamento" {...numeroOrcamento}
                               autoComplete="true"/>
                    </div>
                    <div>
                        <Input id="dataOrcamento" type="date" label="Data Orçamento" {...dataOrcamento}/>
                    </div>
                    <div>
                        <Input id="formaPg" type="text" label="Forma de Pagamento" {...formaPg} autoComplete="true"/>
                    </div>
                </div>

                {/*
                <Textare id="descricao" label="Descrição" value={descricao} setValue={setDescricao}/>
*/}

                <Input id="descricao" type="text" label="Descrição" {...descricao} autoComplete="true"/>


                <h1>PRODUTO / SERVIÇO</h1>
                <Input id="produto" type="text" label="Produto / Serviço"{...produto} autoComplete="true"/>
                <Input id="valor" type="text" label="Valor a cobrar" {...valor} autoComplete="true"/>

                {error && <h1>Existe Campos sem preecher</h1>}
                <button className="btnGerar">Gerar Orçamento</button>


            </form>}

            {dados && <LayoutPdf dados={dados}/>}


        </>
    )

};

export default Form;