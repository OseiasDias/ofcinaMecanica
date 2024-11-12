import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Modal, Button } from "react-bootstrap";
import "../../css/StylesAdmin/tbvCliente.css";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbLockFilled } from "react-icons/tb";
import { BiUserCircle } from "react-icons/bi";

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

export default function TabelaVizualizarClientes() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false); // Modal para visualização
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal para confirmação de exclusão
  const [clientIdToDelete, setClientIdToDelete] = useState(null); // ID do cliente a ser excluído
  const [clientDetails, setClientDetails] = useState(null); // Estado para armazenar os detalhes do cliente

  const columns = [
    {
      name: "Nome",
      selector: (row) => row.nome || "Sem informação", // Verifica se o nome existe
    },
    {
      name: "Email",
      selector: (row) => row.email || "Sem informação", // Verifica se o email existe
    },
    {
      name: "Telefone",
      selector: (row) => row.telefone || "Sem informação", // Verifica se o telefone existe
    },
    {
      name: "Endereço",
      selector: (row) => row.endereco || "Sem informação", // Verifica se o endereço existe
    },
    {
      name: "Gênero",
      selector: (row) => row.genero || "Sem informação", // Verifica se o gênero existe
    },
    {
      name: "Estado",
      selector: (row) => (row.estado ? "Ativo" : "Inativo") || "Sem informação", // Verifica se o estado existe
    },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleView(row.id_cliente)}>
              <FaRegEye />
              &nbsp;&nbsp;Vizualizar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleEdit(row.id_cliente)}>
              <TbLockFilled />
              &nbsp;&nbsp;Bloquear
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_cliente)}
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
    console.log("Editar cliente com ID:", id);
  };

  const handleView = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clientes/${id}`);
      if (!response.ok) throw new Error("Erro ao buscar cliente");
      const data = await response.json();
      setClientDetails(data); // Armazena os dados do cliente no estado
      setShowViewModal(true); // Exibe a modal de visualização
    } catch (err) {
      toast.error("Erro ao buscar dados do cliente");
    }
  };

  const openDeleteModal = (id) => {
    setClientIdToDelete(id);
    setShowDeleteModal(true); // Exibe a modal de confirmação de exclusão
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/clientes/${clientIdToDelete}`, {
        method: "DELETE",
      });

      setRecords(
        records.filter((record) => record.id_cliente !== clientIdToDelete)
      );
      setShowDeleteModal(false);
      toast.success("Cliente excluído com sucesso!"); // Exibe o Toast de sucesso
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast.error("Erro ao excluir cliente.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/clientes");
        if (!response.ok) throw new Error("Erro ao buscar dados");
        const data = await response.json();
        setRecords(data);
        setOriginalRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="my-4 homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Clientes</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.nome.toLowerCase().includes(query)
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
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal de visualização */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered scrollable size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Cliente</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {clientDetails ? (
            <div className="d-flex justify-content-between">
              <div className="dados">
                <p><strong>Nome:</strong> {clientDetails.nome || "Sem informação"}</p>
                <p><strong>Email:</strong> {clientDetails.email || "Sem informação"}</p>
                <p><strong>Telefone:</strong> {clientDetails.telefone || "Sem informação"}</p>
                <p><strong>Endereço:</strong> {clientDetails.endereco || "Sem informação"}</p>
                <p><strong>Gênero:</strong> {clientDetails.genero || "Sem informação"}</p>
                <p><strong>Estado:</strong> {clientDetails.estado ? "Ativo" : "Inativo" || "Sem informação"}</p>
                <p>
                  <strong>Data de Nascimento:</strong>
                  {clientDetails.data_nascimento
                    ? new Date(clientDetails.data_nascimento).toLocaleDateString("pt-BR")
                    : "Sem informação"}
                </p>
              </div>

              <div className="fotoImagem">
                <BiUserCircle className="fotoAR" />
              </div>
            </div>
          ) : (
            <p>Carregando dados do cliente...</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Tem certeza que deseja excluir este cliente?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
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
