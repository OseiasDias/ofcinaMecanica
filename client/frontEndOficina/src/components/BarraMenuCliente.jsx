import "../css/barraMenuCliente.css";
import foto from "../assets/img/minha.jpg";
import { useState } from "react";
import { Modal, Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { LuHelpingHand } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaHome, FaCalendarAlt, FaBlog } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { MdContentPasteSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import { IoIosAddCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";

function BarraMenuCliente() {
    const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar a modal de logout
    const [showVehicleModal, setShowVehicleModal] = useState(false); // Estado para controlar a modal de veiculos
    const navigate = useNavigate(); // Hook do react-router-dom para redirecionar

    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

    const handleShowVehicleModal = () => setShowVehicleModal(true);
    const handleCloseVehicleModal = () => setShowVehicleModal(false);

    const handleLogout = () => {
        setShowLogoutModal(false);
        navigate("/"); // Redireciona para a página inicial
    };

    const handleNavigateCadastrarVeiculo = () => {
        setShowVehicleModal(false);
        navigate("/cadastroVeiculos"); // Redireciona para a página de cadastrar veículo
    };

    const handleNavigateVerVeiculos = () => {
        setShowVehicleModal(false);
        navigate("/meusVeiculos"); // Redireciona para a página de ver meus veículos
    };

    let nome = "Oseias";

    return (
        <>
            <Navbar expand="lg" className="container-fluid menuCliente px-5 position-fixed w-100">
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

                        <div className="dd d-flex">
                            <NavDropdown
                                title={
                                    <>
                                        <CgMenuGridO fontSize={22} className="iconesMenu" /> Minhas Opções
                                    </>
                                }
                                className="basic-nav-dropCliente"
                                id="basic-nav-dropdow"
                            >
                                <Nav.Link className="linksProprios" href="#link">
                                    <FaCalendarAlt fontSize={20} className="iconesMenu" />
                                    Agendar Manutenção
                                </Nav.Link>

                                {/* Quando clicar aqui, abrirá a modal */}
                                <Nav.Link className="linksProprios" onClick={handleShowVehicleModal}>
                                    <IoCarSportSharp fontSize={20} className="iconesMenu" />
                                    Cadastro de Veiculos
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

                        <div className="fotoGrupo outraDrop d-flex">
                            <NavDropdown
                                title={
                                    <>
                                        <strong className="pe-1">
                                            <img
                                                src={foto}
                                                width={55}
                                                height={50}
                                                className="fotoPerfil me-2"
                                                alt="foto perfil"
                                            />
                                            <span className="nomeFull">{nome} Manuel</span>
                                        </strong>
                                    </>
                                }
                                className="basic-nav-dropClient"
                                id="basic-nav-dropdow"
                            >
                                <Link to="/perfilCliente">
                                    <NavDropdown.Item href="#action/3.1">
                                        <CgProfile className="iconesMenu" fontSize={18} />
                                        Perfil
                                    </NavDropdown.Item>
                                </Link>

                                <NavDropdown.Item href="#action/3.3">
                                    <LuHelpingHand className="iconesMenu" fontSize={18} />
                                    Ajuda
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleShowLogoutModal}>
                                    <IoIosLogOut className="iconesMenu" fontSize={18} /> Sair
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* Modal de confirmação de saída */}
            <Modal show={showLogoutModal} onHide={handleCloseLogoutModal}>
                <div className="bordarModal">
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmar Saída</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tem certeza de que deseja sair?</Modal.Body>
                    <Modal.Footer >
                        <Button variant="danger" onClick={handleCloseLogoutModal}>
                            Não
                        </Button>
                        <Button variant="primary" onClick={handleLogout}>
                            Sim
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>


            {/* Modal com as opções de veículo */}
            <Modal show={showVehicleModal} onHide={handleCloseVehicleModal} centered>
                <div className="bordarModal">
                    <Modal.Header closeButton>
                        <Modal.Title>Opções de Veículo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-between">
                        
                        <Button variant="primary" className="" onClick={handleNavigateCadastrarVeiculo}>
                           <IoIosAddCircle /> Cadastrar Veículo
                        </Button>
                        
                        <Button variant="secondary" onClick={handleNavigateVerVeiculos}>
                           <FaEye /> Ver Meus Veículos
                        </Button>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    );
}

export default BarraMenuCliente;
