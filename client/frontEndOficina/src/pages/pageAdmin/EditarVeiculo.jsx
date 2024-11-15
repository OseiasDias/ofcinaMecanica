import "../../css/StylesAdmin/homeAdministrador.css";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function VisualizarVeiculo() {
  const { idVeiculo } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [client, setClient] = useState(null);
  const [agendamento, setAgendamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      if (!idVeiculo) {
        throw new Error('ID do veículo não encontrado na URL.');
      }

      // Buscar dados do veículo
      const vehicleResponse = await fetch(`http://localhost:5000/api/veiculos/${idVeiculo}`);
      if (!vehicleResponse.ok) {
        throw new Error(`Erro ao buscar dados do veículo. Código: ${vehicleResponse.status}`);
      }
      const vehicleData = await vehicleResponse.json();
      setVehicle(vehicleData);

      // Buscar dados do cliente associado ao veículo
      if (vehicleData.id_cliente) {
        const clientResponse = await fetch(`http://localhost:5000/api/clientes/${vehicleData.id_cliente}`);
        if (!clientResponse.ok) {
          throw new Error("Erro ao buscar dados do cliente.");
        }
        const clientData = await clientResponse.json();
        setClient(clientData);
      }

      // Buscar dados do agendamento do veículo
      const agendamentoResponse = await fetch(`http://localhost:5000/api/agendamentos/`);
      if (!agendamentoResponse.ok) {
        throw new Error(`Erro ao buscar dados do agendamento. Código: ${agendamentoResponse.status}`);
      }
      const agendamentoData = await agendamentoResponse.json();
      const agendamentoVeiculo = agendamentoData.find(agendamento => agendamento.id_veiculo === parseInt(idVeiculo));
      setAgendamento(agendamentoVeiculo);
    } catch (err) {
      setError(err.message);
      toast.error(`Erro ao carregar os dados: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idVeiculo]); // Chama a função toda vez que o ID muda

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="container mt-4">
      <h5>Detalhes do Veículo</h5>
      {vehicle? (
        <div className="card p-4">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <p><strong>Marca:</strong> {vehicle.marca || 'Sem informação'}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <p><strong>Modelo:</strong> {vehicle.modelo || 'Sem informação'}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <p><strong>Ano:</strong> {vehicle.ano || 'Sem informação'}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <p><strong>Placa:</strong> {vehicle.placa || 'Sem informação'}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <p><strong>Status de Reparação:</strong> {vehicle.status_reparacao || 'Sem informação'}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Dados do veículo não encontrados.</p>
      )}

      {client? (
        <>
          <h5 className="my-3">Detalhes do Cliente</h5>
          <div className="card p-4">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Nome:</strong> {client.nome || 'Sem informação'}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Email:</strong> {client.email || 'Sem informação'}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Endereço:</strong> {client.endereco || 'Sem informação'}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Telefone:</strong> {client.telefone || 'Sem informação'}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h6 className="my-3 text-danger">Cliente não encontrado.</h6>
      )}

      <h5 className="my-3">Detalhes do Agendamento</h5>
      {agendamento? (
        <>
          <div className="card p-4">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Data de Agendada:</strong> {agendamento.data || 'Sem informação'}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Descrição:</strong> {agendamento.descricao || 'Sem informação'}</p>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <p><strong>Motivo de Adiamento:</strong> {agendamento.motivoAdiar || 'Sem informação'}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h6 className="my-3 text-danger">Veículo entrou sem agendamento.</h6>
      )}

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}




const EditarVeiculoAll = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100">
            <TopoAdmin
              entrada="Editar o conteudo do Blog"
              leftSeta={<FaArrowLeftLong />}
              leftR='/blogList' // Redireciona de volta para a lista de agendamentos
            />

            <div className="vh-100 alturaPereita">

              <VisualizarVeiculo />

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

export default EditarVeiculoAll;
