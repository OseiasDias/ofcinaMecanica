import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import TabelaVizualizarVeiculos from "../../components/compenentesAdmin/TabelaVizualizarVeiculos";

const Veiculos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Veiculos"  icone={<IoIosAdd />} direccao="/addVeiculos" />

            <div className="vh-100">
            <TabelaVizualizarVeiculos />
            </div>
            <p className="text-center np pt-5 mt-5 ppAr">
              <hr />
              Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
              reservados.
              <br />
              Desenvolvido por: <b>Oseias Dias</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Veiculos;
