
/*

import { NavLink } from 'react-router-dom';
import '../../css/StylesAdmin/homeAdministrador.css';
import {
    FaBars,
    FaUserAlt,
} from "react-icons/fa";
import { useState } from 'react';
import fotoLogo from '../../assets/img/lgo.png';




export default function MenuLeft({ children }) {

    
    const [isOpen, setIsOpen] = useState(true); // Menu começa aberto
   // const [submenuOpen, setSubmenuOpen] = useState({}); // Estado para controlar os submenus
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        { path: "/", name: "Clientes", icon: <FaUserAlt /> },
        { path: "/", name: "Funcionários", icon: <FaUserAlt /> },
        { path: "/", name: "Estudantes", icon: <FaUserAlt /> },
        { path: "/", name: "Professores", icon: <FaUserAlt /> },
    ];

    return (
        <div className="container-full">
            <div className="sideBar bg-primary" style={{width: isOpen ? "300px": "50px"}}>
                <div className="top_section">
                    <div className="logo" style={{display: isOpen ? "block": "none"}}>
                        <img src={fotoLogo} alt="Logotipo biturbo" className='imagemLogo'/>

                    </div>
                    <div className="bars" style={{marginLeft: isOpen ? "20px": "0px"}}>
                        <FaBars onClick={toggle}/>
                    </div>
                </div>

                {menuItem.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                       <div className="d-flex">
                       <div className="icon"  style={{marginLeft: isOpen ? "15px": "15px"}}>{item.icon}</div>
                       <div className="link_text" style={{display: isOpen ? "block": "none"}}>{item.name}</div>
                       </div>
                    </NavLink>
                ))}
            </div>

            <main className='menuEsp'>{children}</main>
        </div>
    );
}
*/
import { NavLink } from 'react-router-dom';
import '../../css/StylesAdmin/homeAdministrador.css';
import { FaBars, FaUserAlt } from "react-icons/fa";
import { useState } from 'react';
import fotoLogo from '../../assets/img/lgo.png';

export default function MenuLeft({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState({});

    const toggle = () => setIsOpen(!isOpen);

    // Função para alternar o submenu
    const toggleSubmenu = (index) => {
        setSubmenuOpen((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const menuItem = [
        { path: "/", name: "Clientes", icon: <FaUserAlt />, subItems: ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4", "Cliente 5"] },
        { path: "/", name: "Funcionários", icon: <FaUserAlt />, subItems: ["Funcionário 1", "Funcionário 2", "Funcionário 3"] },
        { path: "/", name: "Estudantes", icon: <FaUserAlt />, subItems: ["Estudante 1", "Estudante 2", "Estudante 3"] },
        { path: "/", name: "Professores", icon: <FaUserAlt />, subItems: ["Professor 1", "Professor 2", "Professor 3"] },
    ];

    return (
        <div className="container-full">
            <div className="sideBar" style={{ width: isOpen ? "250px" : "60px" }}>
                <div className="top_section">
                    {isOpen && (
                        <div className="logo">
                            <img src={fotoLogo} alt="Logotipo biturbo" className="imagemLogo" />
                        </div>
                    )}
                    <div className="bars" onClick={toggle}>
                        <FaBars />
                    </div>
                </div>

                {menuItem.map((item, index) => (
                    <div key={index} className="menu_item">
                        <div className="link" onClick={() => toggleSubmenu(index)}>
                            <div className="icon">{item.icon}</div>
                            {isOpen && <span className="link_text">{item.name}</span>}
                        </div>
                        
                        {submenuOpen[index] && isOpen && (
                            <div className="submenu">
                                {item.subItems.map((subItem, subIndex) => (
                                    <NavLink to={`${item.path}/${subItem.toLowerCase().replace(" ", "-")}`} key={subIndex} className="submenu_link">
                                        {subItem}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <main className="menuEsp">{children}</main>
        </div>
    );
}
