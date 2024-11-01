import { data } from "../../utils/Dados.jsx";
import DataTable from "react-data-table-component";
import "../../css/StylesAdmin/tbvCliente.css";
import { useState } from "react";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#044697",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bolder",
    },
  },
  cells: {
    style: {
      padding: "8px", // Adicionando um pouco de padding para as células
    },
  },
};

export default function TabelaVizualizarClientes() {
  const columns = [
    {
      name: "Nome",
      selector: (row) => row.name,
    },
    {
      name: "Data Nascimento",
      selector: (row) => row.DataNasc,
    },
    {
      name: "Morada",
      selector: (row) => row.morada,
    },
    {
      name: "Ação", // Corrigido para "Ação" em português
      selector: (row) => row.accao,
    },
  ];

  const [records, setRecords] = useState(data);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase(); // Converte a consulta para minúsculas
    const newRecords = data.filter(item => 
      item.name.toLowerCase().includes(query) // Corrigido para usar 'toLowerCase' corretamente
    );
    setRecords(newRecords);
  };

  return (
    <>
        <div className="vh-100">
        <div className="my-4 homeDiv ">
        <div className="search d-flex justify-content-between">
          <h3>Lista de Clientes</h3>
          <input 
            type="text" 
            placeholder="Pesquisa por nome" 
            className="" 
            onChange={handleChange} 
          />
        </div>
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          pagination // Adicionando paginação, se necessário
        />
      </div>
        </div>
      <p className="text-center mt-5 ppAr">
        <hr />
        Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
        reservados.
        <br />
        Desenvolvido por: <b>Oseias Dias</b>
      </p>
    </>
  );
}