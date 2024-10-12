import "../css/barraMenuCliente.css";
import foto from "../assets/img/minha.jpg";

//import Container from 'react-bootstrap/Container';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
//import { TbMessageFilled } from "react-icons/tb";
//importando icones

import { CgProfile } from "react-icons/cg";
import { LuHelpingHand } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";

import { FaHome } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { MdContentPasteSearch } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";

function BarraMenuCliente() {
  let nome = "Oseias";
  const titlo = `${<CgMenuGridO />} Minhas Opções`;
  return (
    <Navbar expand="lg" className=" container-fluid menuCliente px-5 position-fixed w-100">
      <Navbar.Brand href="#home">OficinaNome</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          
          <Link to="/homeCliente">
          <Nav.Link className="linksProprios" href="#home">
            <FaHome fontSize={20} className="iconesMenu" />
            Home
          </Nav.Link>
          </Link>

          <div className="ddd d-flex">
       
          <NavDropdown
            title={titlo}
            className="basic-nav-dropCliente"
            id="basic-nav-dropdow"
          >
            <Nav.Link className="linksProprios" href="#link">
              <FaCalendarAlt fontSize={20} className="iconesMenu" />
              Agendar Manutenção
            </Nav.Link>
            <Nav.Link className="linksProprios" href="#link">
              <IoCarSportSharp fontSize={20} className="iconesMenu" />
              Cadastrar Veiculo
            </Nav.Link>
            <Nav.Link className="linksProprios" href="#link">
              <MdContentPasteSearch fontSize={20} className="iconesMenu" />
              Consultar o estado
            </Nav.Link>
          </NavDropdown>
          </div>

          <Link to="/Blog">
            <Nav.Link className="linksProprios" href="#link">
              <FaBlog fontSize={20} className="iconesMenu" />
              Blog
            </Nav.Link>
          </Link>
          <div className="fotoGrupo d-flex">
            <img
              src={foto}
              width={55}
              height={50}
              className="fotoPerfil"
              alt="foto perfil"
            />
            <NavDropdown
              title={
                <>
                  <strong>{nome}</strong>
                </>
              }
              className="basic-nav-dropClient"
              id="basic-nav-dropdow"
            >
              <NavDropdown.Item href="#action/3.1">
                <CgProfile className="iconesMenu" fontSize={18} />
                Perfil
              </NavDropdown.Item>

              <NavDropdown.Item href="#action/3.3">
                <LuHelpingHand className="iconesMenu" fontSize={18} />
                Ajuda
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                <IoIosLogOut className="iconesMenu" fontSize={18} /> Sair
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default BarraMenuCliente;
