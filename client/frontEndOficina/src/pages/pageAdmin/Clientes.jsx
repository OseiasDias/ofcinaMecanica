import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import TabelaVizualizarClientes from "../../components/compenentesAdmin/TabelaVizualizarClientes";

const Clientes = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Painel" icone={<IoIosAdd />} />

            <TabelaVizualizarClientes />
          </div>
        </div>
      </div>
    </>
  );
};

export default Clientes;
