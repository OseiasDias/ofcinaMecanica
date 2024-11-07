import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import AdicionarFuncionarios from "../../components/compenentesAdmin/AdcionarFuncionarios.jsx";


const AddFuncionarios = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Funcionarios" leftSeta={<FaArrowLeftLong />} leftR="/funcionariosList" />

            <div className="vh-100">
            <AdicionarFuncionarios />
          
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

export default AddFuncionarios;
