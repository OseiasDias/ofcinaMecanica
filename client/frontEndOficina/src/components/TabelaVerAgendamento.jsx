import { useState } from "react";
import '../css/tabelaVerAgendamento.css';


import Dropdown from 'react-bootstrap/Dropdown';

function BotaoMenu() {
  return (
    <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic" className="corEdite">
      
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Editar</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Cancelar</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
  );
}



function TabelaVerAgendamento() {
    const [searchTerm, setSearchTerm] = useState("");
    
    const agendamentos = [
        {
            id_agendamento: 1,
            data: "2024-10-12",
            id_cliente: "C001",
            id_veiculo: "V123",
            matricula: "ABC-1234",
            id_servico: "S001",
            status: "Pendente",
        },
        {
            id_agendamento: 2,
            data: "2024-10-15",
            id_cliente: "C002",
            id_veiculo: "V124",
            matricula: "XYZ-5678",
            id_servico: "S002",
            status: "Concluído",
        },
        {
            id_agendamento: 3,
            data: "2024-10-18",
            id_cliente: "C003",
            id_veiculo: "V125",
            matricula: "LMN-9012",
            id_servico: "S003",
            status: "Cancelado",
        },
        {
            id_agendamento: 4,
            data: "2024-10-12",
            id_cliente: "C001",
            id_veiculo: "V123",
            matricula: "ABC-1234",
            id_servico: "S001",
            status: "Pendente",
        },
        {
            id_agendamento: 5,
            data: "2024-10-15",
            id_cliente: "C002",
            id_veiculo: "V124",
            matricula: "XYZ-5678",
            id_servico: "S002",
            status: "Concluído",
        } 
    ];

    // Função para filtrar os agendamentos com base no termo de pesquisa
    const filteredAgendamentos = agendamentos.filter((agendamento) =>
        agendamento.id_veiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agendamento.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agendamento.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-agendamento container mb-5">
            <h3 className="my-4">Meus Agendamentos</h3>

            {/* Barra de pesquisa */}
            <div className="row mb-3 justify-content-end">
                <div className="col-12 col-md-8 col-lg-6">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar por veículo, matrícula ou status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>

            {/* Exibição dos agendamentos filtrados */}
            
                <div className="row">
                    {filteredAgendamentos.length > 0 ? (
                        filteredAgendamentos.map((agendamento) => (
                            <div key={agendamento.id_agendamento} className="col-12 col-md-6 col-lg-3 my-3">
                                <div className="bg-light p-3 dadoAgendamento">
                                    <p><strong>Data:</strong> {agendamento.data}</p>
                                    <p><strong>ID Veículo:</strong> {agendamento.id_veiculo}</p>
                                    <p><strong>Matrícula:</strong> {agendamento.matricula}</p>
                                    <p><strong>Status:</strong> {agendamento.status}</p>
                                    <button className="iconeEditar"><BotaoMenu /> </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p>Nenhum agendamento encontrado.</p>
                        </div>
                    )}
                </div>
            
        </div>
    );
}

export default TabelaVerAgendamento;
