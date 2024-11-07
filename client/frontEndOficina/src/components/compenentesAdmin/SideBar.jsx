import { FaBlogger, FaBox, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaHome, /**FaLock, FaMoneyBill, */ FaUser } from "react-icons/fa";
import {  MdNotifications } from "react-icons/md";
import {  BiCog } from "react-icons/bi";
import { FaCarRear } from "react-icons/fa6";
//import { BsCartCheck } from "react-icons/bs";
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

const routes = [
  { path: "/homeAdministrador", name: "Painel", icon: <FaHome /> },
  {
   // path: "/file-manager",
    name: "Usuarios",
    icon: <FaUsers  />,
    subRoutes: [
      { path: "/clienteList", name: "Clientes", icon: <FaCircleUser/> },
      { path: "/funcionariosList", name: "Funcionarios", icon: <FaUser/> },
     
    ],
  },
  { path: "/agendamentoList", name: "Agendamentos", icon: <FaCalendarDays  /> },
  { path: "/blogList", name: "Blog", icon: <FaBlogger /> },
  
  { path: "/estoqueList", name: "Estoque", icon: <FaBox /> },
  { path: "/users", name: "Notificação", icon: <MdNotifications /> },
  { path: "/pagamentoList", name: "Pagamentos", icon: <FaSackDollar /> },
  { path: "/servicosList", name: "Serviços", icon: <GrServices  /> },
  { path: "/veiculosList", name: "Veiculos", icon: <FaCarRear /> },
 
  {
    path: "/settings",
    name: "Definições",
    icon: <BiCog />,
   /* subRoutes: [
      { path: "/settings/profile", name: "Profile", icon: <FaUser /> },
      { path: "/settings/2fa", name: "2FA", icon: <FaLock /> },
      { path: "/settings/billing", name: "Billing", icon: <FaMoneyBill /> }
     
    ],*/
   
  },
  { path: "/users", name: "Sair", icon: <FaSignOutAlt /> },

 
];

// eslint-disable-next-line react/prop-types
const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.1 } },
    show: { width: "auto", opacity: 1, transition: { duration: 0.5 } },
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
            {isOpen ? <FaArrowLeft  className="itemHamburg" /> : <GiHamburgerMenu className="itemHamburg"  />}
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
              <NavLink
                to={route.path}
                key={index}
                className="link "
                activeClassName="active"
              >
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
        </section>
      </motion.div>
      
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
