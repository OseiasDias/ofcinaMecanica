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

export default function TabelaEstoque() {
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVisualizarModal, setShowVisualizarModal] = useState(false); // Modal para visualização
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [itemDetails, setItemDetails] = useState(null); // Para armazenar os detalhes do item

  const sortedRecords = [...records].sort((a, b) => new Date(b.data_reposicao) - new Date(a.data_reposicao));

  const columns = [
    { name: "Nome da Peça", selector: (row) => row.nome_peca },
    { name: "Quantidade", selector: (row) => row.quantidade },
    { name: "Data de Reposição", selector: (row) => new Date(row.data_reposicao).toLocaleDateString() },
    {
      name: "Ações",
      cell: (row) => (
        <Dropdown className="btnDrop" drop="up">
          <Dropdown.Toggle variant="link" id="dropdown-basic"></Dropdown.Toggle>
          <Dropdown.Menu className="cimaAll">
            <Dropdown.Item onClick={() => handleVisualizar(row)}>
              <FaRegEye />
              &nbsp;&nbsp;Visualizar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleEdit(row.id_item)}>
              <FiEdit />
              &nbsp;&nbsp;Editar
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => openDeleteModal(row.id_item)}
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

  // Função para abrir o modal de visualização
  const handleVisualizar = (row) => {
    setItemDetails(row);  // Armazena os detalhes do item no estado
    setShowVisualizarModal(true);  // Exibe a modal de visualização
  };

  const handleEdit = (id) => {
    console.log("Editar item com ID:", id);
  };

  const openDeleteModal = (id) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/estoque/${itemIdToDelete}`, {
        method: "DELETE",
      });

      const updatedRecords = records.filter((record) => record.id_item !== itemIdToDelete);
      setRecords(updatedRecords);
      setOriginalRecords(originalRecords.filter((record) => record.id_item !== itemIdToDelete));
      
      if (updatedRecords.length === 0) {
        fetchData();
      }

      setShowModal(false);
      toast.success("Item excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      toast.error("Erro ao excluir item.");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/estoque");
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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="my-4 homeDiv">
      <div className="search row d-flex justify-content-between">
        <div className="col-12 col-md-6 col-lg-6">
          <h4>Lista de Produtos em Estoque</h4>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <input
            type="text"
            className="w-100 my-2 zIndex"
            placeholder="Pesquisa por nome da peça"
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              if (!query) {
                setRecords(originalRecords);
              } else {
                const filteredRecords = originalRecords.filter((item) =>
                  item.nome_peca.toLowerCase().includes(query)
                );
                setRecords(filteredRecords);
              }
            }}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={sortedRecords}
        customStyles={customStyles}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10]}
        noDataComponent={<p>Nenhum item encontrado.</p>}
        footer={<div>Exibindo {records.length} registros no total</div>}
      />

      {/* Modal para visualização do item */}
      <Modal show={showVisualizarModal} onHide={() => setShowVisualizarModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{itemDetails ? itemDetails.nome_peca : "Carregando..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {itemDetails ? (
            <>
              <p><strong>Nome da Peça:</strong> {itemDetails.nome_peca}</p>
              <p><strong>Quantidade:</strong> {itemDetails.quantidade}</p>
              <p><strong>Data de Reposição:</strong> {new Date(itemDetails.data_reposicao).toLocaleDateString()}</p>
              {/* Outros dados adicionais podem ser adicionados aqui */}
            </>
          ) : (
            <p>Carregando dados do item...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVisualizarModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este item?</Modal.Body>
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
