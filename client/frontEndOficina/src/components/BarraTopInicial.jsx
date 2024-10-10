import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import  '../css/barraTopInicial.css';

import { IoLogInOutline } from "react-icons/io5";
import { MdOutlinePersonAdd } from "react-icons/md";

function BarraTopInicial() {
  return (
    <Navbar expand="md" className="bg-body-tertiary menuTopInicial py-2 position-fixed w-100">
      <Container>
        <Navbar.Brand href="#home" className='navbar-brand'>OficinaNome</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"> 
          <Nav className="ms-auto d-flex justify-content-content">
            <Nav.Link href="#home" className='links-acessos px-3'><IoLogInOutline /> Entrar </Nav.Link>
            <Nav.Link href="#link" className='links-acessos link2 px-3'><MdOutlinePersonAdd /> Cadastrar-se </Nav.Link>
          
          </Nav>
        </Navbar.Collapse> 
      </Container>
    </Navbar>
  );
}

export default BarraTopInicial;



