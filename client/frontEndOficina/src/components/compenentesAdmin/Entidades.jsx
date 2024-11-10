import { FaBlogger, FaBox } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
//import { BiCog } from "react-icons/bi";
import { FaCalendarDays, FaCarRear, FaSackDollar } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
//import { FaUsers } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoNewspaperSharp } from "react-icons/io5";


export default function Entidades() {
  return (
    <>
      <div className="seccao-entidade mt-5">
        
          <div className="row">
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/clienteList">
                <div className="box-icon">
                  <FaCircleUser className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">25</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh">Clientes</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/funcionariosList">
                <div className="box-icon">
                  <FaUser className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">28</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh">Funcionarios</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/agendamentoList">
                <div className="box-icon">
                  <FaCalendarDays className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">18</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh">Agendamento</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/blogList">
                <div className="box-icon">
                  <FaBlogger className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">34</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh text-center">Blogger</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/estoqueList">
                <div className="box-icon">
                  <FaBox className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">25</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh">Estoque</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/faturaList">
                <div className="box-icon">
                  <IoNewspaperSharp className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">15</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh">Faturas</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/pagamentoList">
                <div className="box-icon">
                  <FaSackDollar className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">31</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh">Pagamento</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/servicosList">
                <div className="box-icon">
                  <GrServices className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">25</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh">Serviços</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/veiculosList">
                <div className="box-icon">
                  <FaCarRear className="ikone " />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">25</span>
                <div className="">
                  <h6 className="text-center text-black tituloSh">Veiculos</h6>
                </div>
              </Link>
            </div>
            </div>
            
            
          </div>

         <div className="text-center mt-5 ppAr">
         <hr />
         <p className="text-center">
            
            Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
          <br />Desenvolvido por: <b>Oseias Dias</b></p>
         </div>
        </div>
      
    </>
  );
}
