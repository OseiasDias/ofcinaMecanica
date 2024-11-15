import { IoIosAdd } from "react-icons/io";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopPerfil from "../../components/compenentesAdmin/TopPerfil";





const ExibirDadosVeiculo = () => {
  const { idVeiculo } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [networkError, setNetworkError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/veiculos/${idVeiculo}`);
      setVehicle(response.data);
    } catch (error) {
      if (error.response) {
        setServerError(true);
        setError(error.response.data.message);
      } else if (error.request) {
        setNetworkError(true);
        setError('Erro de rede. Verifique sua conexão.');
      } else {
        setError('Erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  const fetchClientDetails = async (idCliente) => {
    if (!idCliente) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/clientes/${idCliente}`);
      setClientDetails(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados do cliente:', error);
      setClientDetails(null);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [idVeiculo]);

  useEffect(() => {
    if (vehicle && vehicle.id_cliente) {
      fetchClientDetails(vehicle.id_cliente);
    }
  }, [vehicle]);

  useEffect(() => {
    setLoading(false);
  }, [vehicle, clientDetails]);

  // Função para exibir "Sem informação" caso o valor seja inválido
  const renderValue = (value) => {
    return value ? value : "Sem informação";
  };

  if (loading) return <p>Carregando...</p>;
  if (networkError) return <p>Erro de rede. Verifique sua conexão.</p>;
  if (serverError) return <p>Erro do servidor: {error}</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <TopPerfil />
      <Tabs
        defaultActiveKey="dadosAtuais"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="dadosAtuais" title="Dados Atuais">
         <div className="container-fluid">
         <div className="row mt-4 h-100">
            
            <div className=" mb-4 col-md-6">
              
              <div className="margemLinha card p-4 h-100">
                <h5>Dados do Veículo</h5>
                <p><strong>Marca:</strong> {renderValue(vehicle.marca)}</p>
                <p><strong>Modelo:</strong> {renderValue(vehicle.modelo)}</p>
                <p><strong>Placa:</strong> {renderValue(vehicle.placa)}</p>
                <p><strong>Ano:</strong> {renderValue(vehicle.ano)}</p>
                <p><strong>Status de Reparação:</strong> {renderValue(vehicle.status_reparacao)}</p>
             
              </div>
            </div>

            {vehicle.id_cliente && (
              <div className="col-md-6">
                  <div className="margemLinha card p-4 h-100">
               
                  <h5>Dados do Cliente</h5>
                  {clientDetails ? (
                    <div>
                      <p><strong>Nome:</strong> {renderValue(clientDetails.nome)}</p>
                      <p><strong>Email:</strong> {renderValue(clientDetails.email)}</p>
                      <p><strong>Telefone:</strong> {renderValue(clientDetails.telefone)}</p>
                      <p><strong>Endereço:</strong> {renderValue(clientDetails.endereco)}</p>
                      <p><strong>Gênero:</strong> {renderValue(clientDetails.genero)}</p>
                      <p><strong>Data de Nascimento:</strong> {clientDetails.data_nascimento ? new Date(clientDetails.data_nascimento).toLocaleDateString() : "Sem informação"}</p>
                    </div>
                  ) : (
                    <p>Carregando dados do cliente...</p>
                  )}
              
                  </div>
              </div>
            )}
          </div>
         </div>
        </Tab>
        <Tab eventKey="profile" title="Editar os Dados">
          Tab content for Profile
        </Tab>
      </Tabs>
    </div>
  );
};










const PerfilVeiculo = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Dados do Veículo" leftSeta={<FaArrowLeftLong
            />} icone={<IoIosAdd />} leftR='/funcionariosList' />

            <div className="vh-100 alturaPereita">
            <ExibirDadosVeiculo />

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

export default PerfilVeiculo;
