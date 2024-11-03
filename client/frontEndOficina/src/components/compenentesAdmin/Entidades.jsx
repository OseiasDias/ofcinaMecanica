import { FaBlogger, FaBox } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
//import { BiCog } from "react-icons/bi";
import { FaCalendarDays, FaCarRear, FaSackDollar } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
//import { FaUsers } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Entidades() {
  return (
    <>
      <div className="seccao-entidade mt-5">
        
          <div className="row">
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/clienteList">
                <div className="box-icon">
                  <FaCircleUser className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">25</span>
                <div className="">
                  <h6 className="text-center text-black">Clientes</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/funcionariosList">
                <div className="box-icon">
                  <FaUser className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">28</span>
                <div className="">
                  <h6 className="text-center text-black">Funcionarios</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/">
                <div className="box-icon">
                  <FaCalendarDays className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">18</span>
                <div className="">
                  <h6 className="text-center text-black">Agendamento</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/">
                <div className="box-icon">
                  <FaBlogger className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">34</span>
                <div className="">
                  <h6 className="text-center text-black text-center">Blogger</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/estoqueList">
                <div className="box-icon">
                  <FaBox className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">25</span>
                <div className="">
                  <h6 className="text-center text-black">Estoque</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/">
                <div className="box-icon">
                  <MdNotifications className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">15</span>
                <div className="">
                  <h6 className="text-center text-black">SMS</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/">
                <div className="box-icon">
                  <FaSackDollar className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">31</span>
                <div className="">
                  <h6 className="text-center text-black">Pagamento</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/">
                <div className="box-icon">
                  <GrServices className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">25</span>
                <div className="">
                  <h6 className="text-center text-black">Serviços</h6>
                </div>
              </Link>
            </div>
            </div>
            <div className="col-6 col-md-4 col-lg-3 ">
             <div className="abertura mb-3 py-3">
              <Link to="/veiculosList">
                <div className="box-icon">
                  <FaCarRear className="ikone" />
                </div>
                <span className="text-black text-center fw-bold my-1 entiSize d-block">25</span>
                <div className="">
                  <h6 className="text-center text-black">Veiculos</h6>
                </div>
              </Link>
            </div>
            </div>
            
            
          </div>

          <p className="text-center mt-5 ppAr">
            <hr />
            Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
          <br />Desenvolvido por: <b>Oseias Dias</b></p>
        </div>
      
    </>
  );
}
