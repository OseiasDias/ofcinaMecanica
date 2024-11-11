import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TopPerfil from "../../components/compenentesAdmin/TopPerfil";

 function VerPerfilFuncionario() {
  const { id } = useParams();  // Pega o id da URL
  const [funcionario, setFuncionario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/usuarios/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do funcionário");
        const data = await response.json();
        setFuncionario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionario();
  }, [id]);

  if (loading) return <p>Carregando perfil...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
        <TopPerfil nome={funcionario.nome} email={funcionario.email}
            telefone={funcionario.telefone}
        />
      
      {funcionario ? (
        <div className="row mt-4">
        {/* Seção de Informações Pessoais */}
        <section className="col-12 col-md-6 col-lg-4">
          <h5 className="mb-4 fw-bold">Informações Pessoais</h5>
          <p><strong>Nome:</strong> {funcionario.nome}</p>
          <p><strong>Gênero:</strong> {funcionario.genero}</p>
          <p><strong>Data de Nascimento:</strong> {new Date(funcionario.data_nascimento).toLocaleDateString()}</p>
        </section>

        {/* Seção de Contato */}
        <section className="col-12 col-md-6 col-lg-4">
          <h5 className="mb-4 fw-bold">Contato</h5>
          <p><strong>Email:</strong> {funcionario.email}</p>
          <p><strong>Telefone:</strong> {funcionario.telefone}</p>
          <p><strong>Endereço:</strong> {funcionario.endereco || 'Não disponível'}</p>
        </section>

        {/* Seção Profissional */}
        <section className="col-12 col-md-6 col-lg-4">
          <h5 className="mb-4 fw-bold">Informações Profissionais</h5>
          <p><strong>Nível de Acesso:</strong> {funcionario.nivel_acesso}</p>
          <p><strong>Bilhete de Identidade:</strong> {funcionario.bilhete_identidade || 'Não disponível'}</p>
          <p><strong>IBAN:</strong> {funcionario.iban || 'Não disponível'}</p>
          <p><strong>Data de Admissão:</strong> {funcionario.data_admissao || 'Não disponível'}</p>
        </section>

     
      </div>
      ) : (
        <p>Funcionário não encontrado.</p>
      )}
    </div>
  );
}






const PerfilFuncionarios = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="Configuração de Perfil"  icone={<IoIosAdd />} leftR="/funcionariosList"/>
            
            <div className="vh-100 ">
                    <VerPerfilFuncionario />
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

export default PerfilFuncionarios;
