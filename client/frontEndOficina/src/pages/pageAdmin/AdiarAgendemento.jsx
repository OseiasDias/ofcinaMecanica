import "../../css/StylesAdmin/homeAdministrador.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TopPerfil from "../../components/compenentesAdmin/TopPerfil";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

function AdiarAgendamento() {
  const { id } = useParams();  // Pega o id do agendamento da URL
  const navigate = useNavigate();  // Hook para navegação
  const [agendamento, setAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados do agendamento, cliente e veículo
  const fetchData = async () => {
    try {
      // Primeiro busca o agendamento pelo ID
      const agendamentoResponse = await fetch(`http://localhost:5000/api/agendamentos/${id}`);
      if (!agendamentoResponse.ok) throw new Error("Erro ao buscar dados do agendamento");
      
      const agendamentoData = await agendamentoResponse.json();
      
      // Depois busca os dados do cliente e do veículo com base nos IDs
      const clienteResponse = await fetch(`http://localhost:5000/api/clientes/${agendamentoData.id_cliente}`);
      const veiculoResponse = await fetch(`http://localhost:5000/api/veiculos/${agendamentoData.id_veiculo}`);
      
      if (!clienteResponse.ok || !veiculoResponse.ok) {
        throw new Error("Erro ao buscar dados do cliente ou do veículo");
      }
      
      const clienteData = await clienteResponse.json();
      const veiculoData = await veiculoResponse.json();

      // Agora, combinamos os dados do agendamento, cliente e veículo
      setAgendamento({
        ...agendamentoData,
        nome_cliente: clienteData.nome,
        email_cliente: clienteData.email,
        telefone_cliente: clienteData.telefone,
        veiculo: {
          marca: veiculoData.marca,
          modelo: veiculoData.modelo,
          ano: veiculoData.ano,
          placa: veiculoData.placa || "Sem placa"
        }
      });

    } catch (err) {
      setError(err.message);
      toast.error("Erro ao carregar dados do agendamento");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();  // Chama a função de fetch ao montar o componente
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      {/* TopPerfil mostrando as informações do cliente */}
      <TopPerfil 
        nome={agendamento?.nome_cliente} 
        email={agendamento?.email_cliente} 
        telefone={agendamento?.telefone_cliente} 
      />

      <Tabs
        defaultActiveKey="detalhes-agendamento"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="detalhes-agendamento" title="Detalhes do Agendamento">
          {agendamento ? (
            <div className="row mt-4 pt-2 outrosD">
              {/* Seção de Informações do Agendamento */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Detalhes do Agendamento</h6>
                <p><strong>Cliente:</strong> {agendamento.nome_cliente}</p>
                <p><strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString()}</p>
              </section>

              {/* Seção de Informações do Veículo */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Informações do Veículo</h6>
                <p><strong>Marca:</strong> {agendamento.veiculo?.marca || 'Não disponível'}</p>
                <p><strong>Modelo:</strong> {agendamento.veiculo?.modelo || 'Não disponível'}</p>
                <p><strong>Ano:</strong> {agendamento.veiculo?.ano || 'Não disponível'}</p>
                <p><strong>Placa:</strong> {agendamento.veiculo?.placa || 'Não disponível'}</p>
              </section>

              {/* Seção de Status */}
              <section className="col-12 col-md-6 col-lg-4">
                <h6 className="mb-4 fw-bold">Status do Agendamento</h6>
                <p><strong>Status:</strong> {agendamento.status === 1 ? "Confirmado" : "Cancelado"}</p>
                <p><strong>Observações:</strong> {agendamento.observacoes || 'Sem observações'}</p>
              </section>
              <section className="col-12">
              <p><strong>Descrição:</strong> {agendamento.descricao}</p>

              </section>
            </div>
          ) : (
            <p>Agendamento não encontrado.</p>
          )}
        </Tab>

        <Tab eventKey="editar" title="Editar Agendamento">
          {/* Formulário de edição pode ser adicionado aqui */}
        </Tab>
      </Tabs>
    </div>
  );
}

const AdiarAgendamentoPage = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin
              entrada="Adiar Agendamento"
              leftSeta={<FaArrowLeftLong />}
              leftR='/agendamentosList' // Redireciona de volta para a lista de agendamentos
            />

            <div className="vh-100 alturaPereita">
              <AdiarAgendamento />
            </div>

            <div className="div text-center np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">
                Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
                reservados.
                <br />
                Desenvolvido por: <b>Oseias Dias</b>
              </p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default AdiarAgendamentoPage;
