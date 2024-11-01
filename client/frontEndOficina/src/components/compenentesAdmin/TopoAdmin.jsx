import { IoMdAdd } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUserShield, FaUser } from "react-icons/fa";
import '../../css/StylesAdmin/topoAdmin.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoPowerOutline } from "react-icons/io5";
//import { FaArrowLeftLong } from "react-icons/fa6";


// eslint-disable-next-line react/prop-types
export default function TopoAdmin({ entrada, direccao, icone, leftSeta }) {
  return (
    <div className="topoAdministrador mt-4 d-flex justify-content-between">
      <h2>
        <a href={direccao}>{leftSeta}</a> <span>{entrada}</span> <span className="definirCor">{icone}</span>
      </h2>

      <div className="escolhas d-flex">
        <Dropdown className="distancia userCorR mx-1">
          <Dropdown.Toggle variant="link" bsPrefix="p-0" style={{ boxShadow: 'none' }}>
            <IoMdAdd fontSize={22} style={{ cursor: "pointer" }} color="#044697" />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" className="opAdmin">
            <Dropdown.Item href="/perfil" className="colorir"><IoMdAdd />&nbsp;&nbsp;Clientes</Dropdown.Item>
            <Dropdown.Item href="/logout" className="colorir"><IoMdAdd />&nbsp;Funcionarios</Dropdown.Item>
            <Dropdown.Item href="/perfil" className="colorir"><IoMdAdd />&nbsp;&nbsp;Agendamentos</Dropdown.Item>
            <Dropdown.Item href="/logout" className="colorir"><IoMdAdd />&nbsp;Blog</Dropdown.Item>
            <Dropdown.Item href="/logout" className="colorir"><IoMdAdd />&nbsp;Estoque</Dropdown.Item>
            <Dropdown.Item href="/perfil" className="colorir"><IoMdAdd />&nbsp;&nbsp;Notificação</Dropdown.Item>
            <Dropdown.Item href="/logout" className="colorir"><IoMdAdd />&nbsp;Pagamentos</Dropdown.Item>
            <Dropdown.Item href="/perfil" className="colorir"><IoMdAdd />&nbsp;&nbsp;Serviços</Dropdown.Item>
            <Dropdown.Item href="/logout" className="colorir"><IoMdAdd />&nbsp;Veiculos</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="distancia mx-1">
          <IoSettingsOutline fontSize={22} />
        </div>

        <Dropdown className="distancia userCor mx-1">
          <Dropdown.Toggle variant="link" bsPrefix="p-0" style={{ boxShadow: 'none' }}>
            <FaUserShield fontSize={22} style={{ cursor: "pointer" }} color="#fff" />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end" className="opAdmin">
            <Dropdown.Item href="/perfil" className="colorir"><FaUser />&nbsp;Perfil</Dropdown.Item>
            <Dropdown.Item href="/logout" className="colorir"><IoPowerOutline />&nbsp;Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
