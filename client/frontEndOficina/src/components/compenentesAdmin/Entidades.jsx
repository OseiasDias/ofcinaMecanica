import { useEffect, useState } from "react";
import { FaBlogger, FaBox } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCalendarDays, FaCarRear, FaSackDollar } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoNewspaperSharp } from "react-icons/io5";
import axios from "axios"; // Usando axios para facilitar as requisições

export default function Entidades() {
  // Estado para armazenar as quantidades
  const [quantidades, setQuantidades] = useState({
    clientes: 0,
    funcionarios: 0,
    agendamentos: 0,
    blogs: 0,
    estoque: 0,
    faturas: 0,
    pagamentos: 0,
    servicos: 0,
    veiculos: 0
  });

  // Função para buscar as quantidades de cada entidade
  const buscarQuantidades = async () => {
    try {
      const [
        clientes,
        funcionarios,
        agendamentos,
        blogs,
        estoque,
        faturas,
        pagamentos,
        servicos,
        veiculos
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/clientes/total"),
        axios.get("http://localhost:5000/api/usuario/total"),
        axios.get("http://localhost:5000/api/agendamentos/total"),
        axios.get("http://localhost:5000/api/blogs/total"),
        axios.get("http://localhost:5000/api/estoque/total"),
        axios.get("http://localhost:5000/api/fatura/total"),
        axios.get("http://localhost:5000/api/pagamento/total"),
        axios.get("http://localhost:5000/api/servico/total"),
        axios.get("http://localhost:5000/api/veiculo/total")
      ]);

      setQuantidades({
        clientes: clientes.data.total,
        funcionarios: funcionarios.data.total,
        agendamentos: agendamentos.data.total,
        blogs: blogs.data.total,
        estoque: estoque.data.total,
        faturas: faturas.data.total,
        pagamentos: pagamentos.data.total,
        servicos: servicos.data.total,
        veiculos: veiculos.data.total
      });
    } catch (error) {
      console.error("Erro ao buscar quantidades", error);
    }
  };

  // Executa a busca das quantidades quando o componente for montado
  useEffect(() => {
    buscarQuantidades();
  }, []);

  return (
    <>
      <div className="seccao-entidade mt-5">
        <div className="row">
          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/clienteList">
                <div className="box-icon">
                  <FaCircleUser className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.clientes}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Clientes</h6>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/funcionariosList">
                <div className="box-icon">
                  <FaUser className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.funcionarios}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Funcionários</h6>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/agendamentoList">
                <div className="box-icon">
                  <FaCalendarDays className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.agendamentos}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Agendamentos</h6>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/blogList">
                <div className="box-icon">
                  <FaBlogger className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.blogs}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Blogger</h6>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/estoqueList">
                <div className="box-icon">
                  <FaBox className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.estoque}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Estoque</h6>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/faturaList">
                <div className="box-icon">
                  <IoNewspaperSharp className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.faturas}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Faturas</h6>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/pagamentoList">
                <div className="box-icon">
                  <FaSackDollar className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.pagamentos}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Pagamentos</h6>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/servicosList">
                <div className="box-icon">
                  <GrServices className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.servicos}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Serviços</h6>
                </div>
              </Link>
            </div>
          </div>

          <div className="col-6 col-md-4 col-lg-3">
            <div className="abertura mb-3 py-3">
              <Link to="/veiculosList">
                <div className="box-icon">
                  <FaCarRear className="ikone" />
                </div>
                <span className="text-black tituloSh text-center fw-bold my-1 entiSize d-block">
                  {quantidades.veiculos}
                </span>
                <div>
                  <h6 className="text-center text-black tituloSh">Veículos</h6>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 ppAr">
          <hr />
          <p className="text-center">
            Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos reservados.
            <br />Desenvolvido por: <b>Oseias Dias</b>
          </p>
        </div>
      </div>
    </>
  );
}
