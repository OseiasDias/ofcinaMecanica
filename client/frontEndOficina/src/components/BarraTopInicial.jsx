import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoLogInOutline } from "react-icons/io5";
import { MdOutlinePersonAdd } from "react-icons/md";
import logo from '../assets/img/bb.png';
import '../css/barraTopInicial.css';
import ModalLogin from '../components/ModalLogin.jsx';
import ModalCadastrarCliente from '../components/ModalCadastrarCliente.jsx'; // Importa a modal de cadastro

function BarraTopInicial() {
  const [modalShowLogin, setModalShowLogin] = useState(false);
  const [modalShowCadastro, setModalShowCadastro] = useState(false); // Novo estado para modal de cadastro

  return (
    <>
      <Navbar expand="md" className="bg-white menuTopInicial py-2 position-fixed w-100">
        <Container>
          <Navbar.Brand href="#home" className='navbar-brand'>
            <><img src={logo} className='logoMotor' alt="imagem de uma moto" /></> OficinaNome
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex justify-content-content">
              <Nav.Link onClick={() => setModalShowLogin(true)} className='links-acessos px-3 mmf'>
                <IoLogInOutline fontSize={20} /> Entrar
              </Nav.Link>
              <Nav.Link onClick={() => setModalShowCadastro(true)} className='links-acessos link2 px-3'>
                <MdOutlinePersonAdd fontSize={20} /> Cadastrar-se
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal de login */}
      <ModalLogin show={modalShowLogin} onHide={() => setModalShowLogin(false)} />

      {/* Modal de cadastro */}
      <ModalCadastrarCliente show={modalShowCadastro} onHide={() => setModalShowCadastro(false)} />
    </>
  );
}

export default BarraTopInicial;
