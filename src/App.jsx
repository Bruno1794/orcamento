import React from "react";
import Form from "./Forms/Form.jsx";
import Orcamento from "./orcamento.jsx";


function App() {

    let pagina = location.pathname;

    if (pagina === "/") {
        pagina = <Form/>
    } else {

        pagina = <Orcamento/>


    }
    return (
        <div>
            {pagina}

        </div>
    )
}

export default App
