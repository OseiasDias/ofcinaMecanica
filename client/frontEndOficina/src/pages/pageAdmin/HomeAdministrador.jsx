import { useState } from "react";
import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import AccordionItem from "../../components/compenentesAdmin/AccordionItens";
import Entidades from "../../components/compenentesAdmin/Entidades";


const HomeAdministrador = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <>
    <div className="container-fluid">
      <div className="d-flex">
        <SideBar toggleMenu={toggleSidebar}  />

        <table className="flexAuto w-100 ">
           
           <TopoAdmin />
           <AccordionItem />
           <Entidades />
         

        </table>
      </div>
      </div>
    
    </>
  );
};

export default HomeAdministrador;
