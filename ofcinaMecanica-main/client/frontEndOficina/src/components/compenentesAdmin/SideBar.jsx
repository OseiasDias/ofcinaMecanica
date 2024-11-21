import { FaAddressCard, FaBalanceScaleRight, FaBlogger, FaBox, FaCartArrowDown, FaClipboardList, FaDollarSign, FaIdCardAlt, FaListOl, FaSignOutAlt, FaTicketAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom"; // Usando useNavigate do React Router
import { FaHome, FaUser } from "react-icons/fa";
import { IoCarSportSharp, IoLibrary, IoNewspaperSharp } from "react-icons/io5";
import { BiCog, BiSolidCarMechanic } from "react-icons/bi";
import { FaCarRear, FaTruckArrowRight, FaUserTie, FaWrench } from "react-icons/fa6";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideBarMenu";
import Logo from "./Logo";
import { GrServices } from "react-icons/gr";
import { GiCardboardBox, GiHamburgerMenu, GiLightningBranches, GiMoneyStack, GiWallet } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaCalendarDays, FaSackDollar } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { MdAttachEmail, MdInventory, MdOutlineInput, MdPayment, MdPriceChange, MdVerified } from "react-icons/md";
// Importando o componente Modal do React Bootstrap
import { Modal, Button } from 'react-bootstrap';
import { FcCustomerSupport } from "react-icons/fc";
import { SiToyota } from "react-icons/si";
import { IoIosColorPalette } from "react-icons/io";
import { AiFillCalculator } from "react-icons/ai";
import { BsTools } from "react-icons/bs";

const routes = [
  { path: "/homeAdministrador", name: "Painel de Controle", icon: <FaHome /> },
  { path: "/agendamentoList", name: "Agendamentos", icon: <FaCalendarDays /> },
  {
    name: "Inventário",
    icon: <MdInventory size={24}/>,
    subRoutes: [
      { path: "", name: "Fornecedor", icon: <FaTruckArrowRight  /> },
      { path: "", name: "Produtos", icon: <FaWrench /> },
      { path: "", name: "Compra", icon: <FaCartArrowDown /> },
      { path: "/estoqueList", name: "Estoque", icon: <GiCardboardBox /> },
    ],
  },
  {
    name: "Usuarios",
    icon: <FaUsers size={24}/>,
    subRoutes: [
      { path: "/clienteList", name: "Clientes", icon: <FaCircleUser /> },
      { path: "/funcionariosList", name: "Funcionarios", icon: <FaUserTie /> },
      { path: "/funcionariosList", name: "Equipe de suporte", icon: <FcCustomerSupport /> },
    ],
  },
  {
    name: "Veículos",
    icon: <BiSolidCarMechanic size={24} />,
    subRoutes: [
      { path: "/clienteList", name: "Lista de veículos", icon: <FaListOl /> },
      { path: "/funcionariosList", name: "Tipos de veículos", icon: <IoCarSportSharp /> },
      { path: "/funcionariosList", name: "Marcas de veículos", icon: <SiToyota /> },
      { path: "/funcionariosList", name: "Cores de Veículos", icon: <IoIosColorPalette /> },
    ],
  },
  { path: "/servicosList", name: "Serviços", icon: <GrServices /> },
  { path: "", name: "Contação", icon: <MdPriceChange /> },
  { path: "/faturaList", name: "Faturas", icon: <IoNewspaperSharp /> },

  {
    name: "Cartão de trabalho",
    icon: <FaAddressCard size={24} />,
    subRoutes: [
      { path: "", name: "Cartão de Trabalho", icon: <FaIdCardAlt /> },
      { path: "", name: "Ingresso", icon: <FaTicketAlt/> },
     
    ],
  },
  {
    name: "Contas",
    icon: <AiFillCalculator size={24}/>,
    subRoutes: [
      { path: "", name: "Lista de taxas", icon: <FaBalanceScaleRight /> },
      { path: "", name: (<>Lista de método  <br /> de pagamento</>), icon: <MdPayment /> },
      { path: "", name: "Rendas", icon: <GiMoneyStack /> },
      { path: "", name: "Dispesas", icon: <GiWallet /> },
    ],
  }, 
  { path: "/blogList", name: "Blog", icon: <FaBlogger /> },
  { path: "/pagamentoList", name: "Pagamentos", icon: <FaSackDollar /> },

  { path: "", name: "Vendas de Peças", icon: <BsTools /> },
  { path: "", name: "Conformidade", icon: <MdVerified /> },
  { path: "", name: "Relatórios", icon: <FaClipboardList /> },

  { path: "", name: "Templates de Email", icon: <MdAttachEmail /> },
  { path: "", name: "Campos Personalizados", icon: <MdOutlineInput /> },
  { path: "", name: "Biblioteca de Observação", icon: <IoLibrary /> },
  { path: "", name: "Galhos", icon: <GiLightningBranches /> },

  { path: "", name: "Relatórios", icon: <TbReportSearch /> },
  { path: "", name: "Definições", icon: <BiCog /> },


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
    localStorage.clear(); // Limpa o localStorage
    
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
