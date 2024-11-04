import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import { FaBlogger, FaBox } from "react-icons/fa";
import {  FaUser } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import { BiCog } from "react-icons/bi";
import { FaCalendarDays, FaCarRear, FaSackDollar } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
//import { FaUsers } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AccordionItem() {
    const [showAccordion, setShowAccordion] = useState(true);

    const handleClose = () => {
        setShowAccordion(false);
    };

    return (
        <div className="row ocultarAccordion">
            {showAccordion && (
                <div
                    className=" accor"
                    style={{ position: "relative" }}
                >
                    <Accordion className="mt-3 ">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <h6 className="me-auto mt-2">Assistente de configuração</h6>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="container">
                                <div className="row justify-content-between">
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/clienteList">
                                            <div className="figuraB">
                                                <FaCircleUser className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">Cliente</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/funcionariosList">
                                            <div className="figuraB">
                                                <FaUser className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">FuncNario</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/agendamentoList">
                                            <div className="figuraB">
                                                <FaCalendarDays className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">Agenda</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/blogList">
                                            <div className="figuraB">
                                                <FaBlogger className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black text-center">Blogger</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/estoqueList">
                                            <div className="figuraB">
                                                <FaBox className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">Estoque</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/">
                                            <div className="figuraB">
                                                <MdNotifications className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">SMS</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/pagamentoList">
                                            <div className="figuraB">
                                                <FaSackDollar className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">PagMento</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/servicosList">
                                            <div className="figuraB">
                                                <GrServices className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">Serviços</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/veiculosList">
                                            <div className="figuraB">
                                                <FaCarRear className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">Veiculos</h6>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-2 col-md-1 col-lg-1 figuraA">
                                        <Link to="/">
                                            <div className="figuraB">
                                                <BiCog className="peca" />
                                            </div>
                                            <div className="clienteA">
                                                <h6 className="text-black">Definições</h6>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    {/* Botão de fechar no canto superior direito */}
                    <div className="close-button" onClick={handleClose}>
                        <FaTimes
                            style={{ cursor: "pointer", color: "#000d" }}
                            title="Fechar"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccordionItem;
