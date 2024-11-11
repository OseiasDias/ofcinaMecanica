import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { IoSettingsOutline, IoPowerOutline } from "react-icons/io5";
import { FaUserShield, FaUser } from "react-icons/fa";
import '../../css/StylesAdmin/topoAdmin.css';
import Dropdown from 'react-bootstrap/Dropdown';

export default function TopoAdmin({ entrada, direccao, icone, leftSeta, leftR }) {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="topoAdministrador  mt-4 d-flex justify-content-between">
      <h4 className="tituloSh formatTexto  ">
        <span onClick={() => handleNavigate(leftR)}>
          {leftSeta}
        </span>{"        "}
        <span>{entrada}</span>
        <> &nbsp;&nbsp;&nbsp;</>
        {direccao && (

          <span className="definirCor" onClick={() => handleNavigate(direccao)}>
            {icone}
          </span>
        )}
      </h4>

      <div className="escolhas d-flex">
        
          <Dropdown className="distancia userCorR mx-1 ">
            <Dropdown.Toggle variant="link" bsPrefix="p-0" style={{ boxShadow: 'none' }}>
              <IoMdAdd fontSize={22} style={{ cursor: "pointer" }} color="#044697" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="opAdmin">
              <Dropdown.Item onClick={() => handleNavigate("/addClientes")} className="colorir">
                <IoMdAdd />&nbsp;&nbsp;Clientes
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/addFuncionarios")} className="colorir">
                <IoMdAdd />&nbsp;Funcionarios
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/perfil")} className="colorir">
                <IoMdAdd />&nbsp;&nbsp;Agendamentos
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/addBlogs")} className="colorir">
                <IoMdAdd />&nbsp;Blog
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/addEstoque")} className="colorir">
                <IoMdAdd />&nbsp;Estoque
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/perfil")} className="colorir">
                <IoMdAdd />&nbsp;&nbsp;Notificação
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/logout")} className="colorir">
                <IoMdAdd />&nbsp;Pagamentos
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/addServicos")} className="colorir">
                <IoMdAdd />&nbsp;&nbsp;Serviços
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/logout")} className="colorir">
                <IoMdAdd />&nbsp;Veiculos
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="distancia mx-1 ">
            <IoSettingsOutline fontSize={22} />
          </div>

          <Dropdown className="distancia  userCor mx-1">
            <Dropdown.Toggle variant="link" bsPrefix="p-0" style={{ boxShadow: 'none' }}>
              <FaUserShield fontSize={22} style={{ cursor: "pointer" }} color="#fff" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end" className="opAdmin">
              <Dropdown.Item onClick={() => handleNavigate("/perfil")} className="colorir">
                <FaUser />&nbsp;Perfil
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleNavigate("/logout")} className="colorir">
                <IoPowerOutline />&nbsp;Sair
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        
      </div>
    </div>
  );
}
