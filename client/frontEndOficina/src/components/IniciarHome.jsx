import "../css/iniciarHome.css";
import BarraTopInicial from "./BarraTopInicial";
import { FaArrowRightLong } from "react-icons/fa6";


export default function IniciarHome() {
  return (
    <div className="seccao-inicio vh-100 text-white">
      <BarraTopInicial />
      <div className="textoGrupo">
            <h1 className="h1-home">Agende a manutenção <br /> do seu veículo</h1>
            <h2 className=" text-center">Conheça os nossos serviços</h2>

            <button className="links-acessos mt-3 py-2 px-4 btn-agendar">Agendar agora <FaArrowRightLong/></button>
      </div>
    </div>
  );
}
