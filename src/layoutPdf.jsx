import React from 'react';
import generatePDF, {Margin} from "react-to-pdf";


const LayoutPdf = ({dados}) => {
    const [teste, setteste] = React.useState('');

    if (!dados) return null;
    const personaliza = {
        method: 'open',
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.SMALL,
            // default is 'A4'
            format: 'A4',
            // default is 'portrait'
            orientation: 'portrait',
        },
    }
    const recuperarConteudo = () => document.getElementById('conteudo');

    React.useEffect(() => {
        const gerar = generatePDF(recuperarConteudo, personaliza)
        if (gerar) {
            setteste(null)
        }
    }, [])
    const data = new Date();

    return (
        <>
            {teste === null ? '' :
                <div id="conteudo" className="conteudoPDF">

                    <div className="emissor">
                        <h1 className="titulo">Orçamento</h1>
                        <h1 className="subtitulo">N° {dados.numeroOrcamento}</h1>
                        <div className="emissorItens">
                            <p className="emissorItem"><span className="negrito">{dados.nome}</span></p>
                            <p className="emissorItem">{dados.email}</p>
                            <p className="emissorItem">{dados.fone}</p>
                            <p className="emissorItem">{dados.site}</p>
                        </div>
                    </div>

                    <hr/>

                    <div>
                        <div className="dadosClietes">
                            <p><span className="negrito">Data da emissão: </span> {dados.dataEmissao.split('-').reverse().join('/')}</p>
                            <p><span className="negrito">Situação do Orçamento:</span> Aguardando um retorno</p>
                        </div>
                        <p className="descricaoServico">{dados.descricao}</p>

                        <div className="dadosClietesItens">

                            <div>
                                <p className=" negrito">Dados do cliente</p>
                                <p><span className="negrito">Nome:</span> {dados.cliente}</p>
                                <p><span
                                    className="negrito">Endereço:</span> {dados.endereco} {dados.cidade}/{dados.estado} -
                                    <span className="negrito">CEP:</span> {dados.cep}
                                </p>

                            </div>
                            <p><span className="negrito">Telefone:</span> {dados.foneCliente}</p>


                        </div>
                    </div>
                    <hr/>

                    <div className="valoresGeral">

                        <div>
                            <h1>Valor Unitario</h1>
                            <p>R$ {dados.valor}</p>
                        </div>

                        <div>
                            <h1>Qtd</h1>
                            <p>1</p>
                        </div>

                        <div>
                            <h1>Valor Total</h1>
                            <p>R$ {dados.valor}</p>
                        </div>

                    </div>
                    <hr/>

                    <div className="outrasInformacao">
                        <h2>Outras Informações</h2>
                        <p><span className="negrito">Validade até:</span> {dados.dataOrcamento.split('-').reverse().join('/')}</p>
                        <p><span className="negrito">Forma de pagamento:</span> {dados.formaPg}</p>
                    </div>


                </div>
            }


        </>


    )


};

export default LayoutPdf;