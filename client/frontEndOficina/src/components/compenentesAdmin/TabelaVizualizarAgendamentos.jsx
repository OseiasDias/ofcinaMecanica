import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#044697",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bolder",
      paddingTop: "10px",
      paddingBottom: "10px",
      marginTop: "60px",
    },
  },
  cells: {
    style: {},
  },
};

export default function TabelaAgendamento() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [agendamentoIdToDelete, setAgendamentoIdToDelete] = useState(null);

  const columns = [
    { name: "Data", selector: (row) => new Date(row.data).toLocaleDateString() },
    { name: "Cliente", selector: (row) => row.nome_cliente || "Carregando..." },
    {
      name: "Veículo",
      selector: (row) => row.veiculo
        ? `${row.veiculo.marca} ${row.veiculo.modelo} (${row.veiculo.ano})`
        : "Carregando...",
    },
    { name: "Status", selector: (row) => row.status },
    { name: "Descrição", selector: (row) => row.descricao || "Sem descrição" },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleEdit(row.id_agendamento)}>
              <FaRegEye />
              &nbsp;&nbsp;Visualizar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleEdit(row.id_agendamento)}>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_agendamento)}
              className="text-danger"
            >
              <MdDeleteOutline />
              &nbsp;&nbsp;Excluir
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log("Editar agendamento com ID:", id);
  };

  const openDeleteModal = (id) => {
    setAgendamentoIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/agendamentos/${agendamentoIdToDelete}`, {
        method: "DELETE",
      });

      const updatedRecords = records.filter((record) => record.id_agendamento !== agendamentoIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_agendamento !== agendamentoIdToDelete));
      
      if (updatedRecords.length === 0) {
        fetchData();
      }

      setShowModal(false);
      toast.success("Agendamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      toast.error("Erro ao excluir agendamento.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/agendamentos");
      if (!response.ok) throw new Error("Erro ao buscar dados dos agendamentos");
      const data = await response.json();

      const dataWithDetails = await Promise.all(
        data.map(async (agendamento) => {
          const clienteResponse = await fetch(`http://localhost:5000/api/clientes/${agendamento.id_cliente}`);
          const veiculoResponse = await fetch(`http://localhost:5000/api/veiculos/${agendamento.id_veiculo}`);
          
          const clienteData = await clienteResponse.json();
          const veiculoData = await veiculoResponse.json();

          return {
            ...agendamento,
            nome_cliente: clienteData.nome,
            veiculo: {
              marca: veiculoData.marca,
              modelo: veiculoData.modelo,
              ano: veiculoData.ano,
            },
          };
        })
      );

      setRecords(dataWithDetails);
      setOriginalRecords(dataWithDetails);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="my-4 homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Agendamentos</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por status, cliente ou marca do veículo"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.status.toLowerCase().includes(query) ||
                  item.nome_cliente.toLowerCase().includes(query) ||
                  (item.veiculo && item.veiculo.marca.toLowerCase().includes(query))
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={records}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10]}
        noDataComponent={<p>Nenhum agendamento encontrado.</p>}
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este agendamento?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
