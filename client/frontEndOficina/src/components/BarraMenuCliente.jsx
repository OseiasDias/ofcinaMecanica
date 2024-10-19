

import "../css/barraMenuCliente.css";
import foto from "../assets/img/minha.jpg";
import { useState } from "react";
import { Modal, Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { LuHelpingHand } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaHome, FaCalendarAlt, FaBlog, FaEye } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { MdContentPasteSearch } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

function BarraMenuCliente() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [showAgendamentoModal, setShowAgendamentoModal] = useState(false);
    const [showConsultarModal, setShowConsultarModal] = useState(false); // Modal para consultar estado
    const [formData, setFormData] = useState({ placa: '' }); // Estado para os dados do formulário
    const [formErrors, setFormErrors] = useState({}); // Estado para os erros de validação
    //const [showLogoutModalAgendamento, setShowLogoutModalAgendamento] = useState(false);


    const navigate = useNavigate();

    const handleShowLogoutModal = () => setShowLogoutModal(true);
    const handleCloseLogoutModal = () => setShowLogoutModal(false);

    const handleShowVehicleModal = () => setShowVehicleModal(true);
    const handleCloseVehicleModal = () => setShowVehicleModal(false);

    const handleShowAgendamentoModal = () => setShowAgendamentoModal(true);
    const handleCloseAgendamentoModal = () => setShowAgendamentoModal(false);

    const handleShowConsultarModal = () => setShowConsultarModal(true);
    const handleCloseConsultarModal = () => setShowConsultarModal(false);

    const handleLogout = () => {
        setShowLogoutModal(false);
        navigate("/");
    };

    const handleNavigateCadastrarVeiculo = () => {
        setShowVehicleModal(false);
        navigate("/cadastroVeiculos");
    };

    /** Modal Listar Agendamento 

    const handleModalListarAgendamento = () => showLogoutModalAgendamento(false);
*/
  

    const handleNavigateVerVeiculos = () => {
        setShowVehicleModal(false);
        navigate("/meusVeiculos");
    };

    const handleNavigateMarcarManutencao = () => {
        setShowAgendamentoModal(false);
        navigate("/agendarManuetencao");
    };

    const handleNavigateVerAgendamentos = () => {
        setShowAgendamentoModal(false);
        navigate("/verAgendamentos");
    };

    const validatePlaca = () => {
        const errors = {};
        if (!formData.placa) {
            errors.placa = "Placa é obrigatória";
        } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.placa)) {
            errors.placa = "A Placa deve conter apenas letras, números e os caracteres / . -";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleConsultarEstado = (e) => {
        e.preventDefault();
        if (validatePlaca()) {
            // Lógica para consultar a placa na base de dados
            console.log("Placa consultada:", formData.placa);
            handleCloseConsultarModal();
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                                <Nav.Link className="linksProprios" onClick={handleShowAgendamentoModal}>
                                    <FaCalendarAlt fontSize={20} className="iconesMenu" />
                                    Agendar Manutenção
                                </Nav.Link>

                                <Nav.Link className="linksProprios" onClick={handleShowVehicleModal}>
                                    <IoCarSportSharp fontSize={20} className="iconesMenu" />
                                    Cadastro de Veiculos
                                </Nav.Link>

                                <Nav.Link className="linksProprios" onClick={handleShowConsultarModal}>
                                    <MdContentPasteSearch fontSize={20} className="iconesMenu" />
                                    Consultar o estado
                                </Nav.Link>
                            </NavDropdown>
                        </div>

                        <Link to="/blogAcess">
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
                        <Button variant="primary" className="me-1" onClick={handleNavigateCadastrarVeiculo}>
                            <IoIosAddCircle /> Cadastrar Veículo
                        </Button>
                        <Button variant="secondary" className="ms-1" onClick={handleNavigateVerVeiculos}>
                            <FaEye /> Ver Meus Veículos
                        </Button>
                    </Modal.Body>
                </div>
            </Modal>

            {/* Modal de agendamento */}
            <Modal show={showAgendamentoModal} onHide={handleCloseAgendamentoModal} centered>
                <div className="bordarModal">
                    <Modal.Header closeButton>
                        <Modal.Title>Opções de Agendamento</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-between">
                        <Button variant="primary" className="me-1" onClick={handleNavigateMarcarManutencao}>
                            <IoIosAddCircle /> Marcar Manutenção
                        </Button>
                        <Button variant="secondary" className="ms-1" onClick={handleNavigateVerAgendamentos}>
                            <FaEye /> Ver Agendamentos
                        </Button>
                    </Modal.Body>
                </div>
            </Modal>

            {/* Modal para consultar estado pela placa */}
            <Modal show={showConsultarModal} onHide={handleCloseConsultarModal} centered>
                <div className="bordarModal">
                    <Modal.Header closeButton>
                        <Modal.Title>Consultar Estado do Veículo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleConsultarEstado}>
                            <Form.Group className="mb-3">
                                <Form.Label>Digite a matricula do veículo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="placa"
                                    value={formData.placa}
                                    onChange={handleChange}
                                    placeholder="Ex: LD-32-23-ID"
                                    isInvalid={!!formErrors.placa}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.placa}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="mx-auto links-acessos d-block">
                                Consultar
                            </Button>
                        </Form>
                    </Modal.Body>
                </div>
            </Modal>



        </>
    );
}

export default BarraMenuCliente;
