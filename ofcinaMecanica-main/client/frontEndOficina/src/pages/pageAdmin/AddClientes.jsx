import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import AdicionarClientes from "../../components/compenentesAdmin/AdcionarClientes";
const AddClientes = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Adicionar Clientes" icone={<IoPersonAdd />} leftSeta={<FaArrowLeftLong />} leftR="/clienteList" />

            <div className="vh-100 alturaPereita">
              <AdicionarClientes />

            </div>
            <div className="div text-center np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">

                Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
                reservados.
                <br />
                Desenvolvido por: <b>Oseias Dias</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientes;
