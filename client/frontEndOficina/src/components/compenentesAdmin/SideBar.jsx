import { FaBlogger, FaBox, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Usando useNavigate do React Router
import { FaHome, FaUser } from "react-icons/fa";
import { IoNewspaperSharp } from "react-icons/io5";
import { BiCog } from "react-icons/bi";
import { FaCarRear } from "react-icons/fa6";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideBarMenu";
import Logo from "./Logo";
import { GrServices } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaCalendarDays, FaSackDollar } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";

// Importando o componente Modal do React Bootstrap
import { Modal, Button } from 'react-bootstrap';

const routes = [
  { path: "/homeAdministrador", name: "Painel", icon: <FaHome /> },
  {
    name: "Usuarios",
    icon: <FaUsers />,
    subRoutes: [
      { path: "/clienteList", name: "Clientes", icon: <FaCircleUser /> },
      { path: "/funcionariosList", name: "Funcionarios", icon: <FaUser /> },
    ],
  },
  { path: "/agendamentoList", name: "Agendamentos", icon: <FaCalendarDays /> },
  { path: "/blogList", name: "Blog", icon: <FaBlogger /> },
  { path: "/estoqueList", name: "Estoque", icon: <FaBox /> },
  { path: "/faturaList", name: "Faturas", icon: <IoNewspaperSharp /> },
  { path: "/pagamentoList", name: "Pagamentos", icon: <FaSackDollar /> },
  { path: "/servicosList", name: "Serviços", icon: <GrServices /> },
  { path: "/veiculosList", name: "Veiculos", icon: <FaCarRear /> },
  { path: "/pagamentoLi", name: "Relatórios", icon: <TbReportSearch /> },
  { path: "/settings", name: "Definições", icon: <BiCog /> },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade da modal
  const navigate = useNavigate(); // Usando o hook useNavigate do React Router

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.1 } },
    show: { width: "auto", opacity: 1, transition: { duration: 0.5 } },
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    // Ação de logout
    navigate('/acessoAdministrador'); // Redireciona para a página de login
    setShowModal(false); // Fecha a modal
  };

  return (
    <div className="main-container">
      <motion.div
        animate={{ width: isOpen ? "250px" : "45px" }}
        transition={{ duration: 0.5, type: "spring", damping: 10 }}
        className="sidebar subContainer"
        style={{ position: "relative" }}
      >
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo"
              >
                <Logo />
              </motion.h1>
            )}
          </AnimatePresence>

          <div className="bars" onClick={toggleMenu} style={{ cursor: "pointer" }}>
            {isOpen ? <FaArrowLeft className="itemHamburg" /> : <GiHamburgerMenu className="itemHamburg" />}
          </div>
        </div>

        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  key={index}
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                />
              );
            }
            return (
              <NavLink to={route.path} key={index} className="link">
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}

          {/* Adiciona a opção de "Sair" que aciona a modal */}
          <div
            key="sair"
            className="link"
            onClick={() => setShowModal(true)} // Abre a modal ao clicar em "Sair"
          >
            <div className="icon">
              <FaSignOutAlt />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text"
                >
                  Sair
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>

      {/* Modal de confirmação de logout usando o React Bootstrap */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tem certeza que deseja sair?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você será redirecionado para a página de login.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>

      <main>{children}</main>
    </div>
  );
};

export default SideBar;
