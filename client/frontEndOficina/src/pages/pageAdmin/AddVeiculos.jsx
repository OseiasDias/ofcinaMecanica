import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import AdicionarVeiculos from "../../components/compenentesAdmin/AdicionarVeiculos.jsx"; 



const AddVeiculos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Cadastrar novo Veiculos" leftSeta={<FaArrowLeftLong />} leftR="/veiculosList" />

            <div className="vh-100">
            <AdicionarVeiculos />
          
            </div>
            <p className="text-center np pt-2 mt-2 ppAr">
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

export default AddVeiculos;
