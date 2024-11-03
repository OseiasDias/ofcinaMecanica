import SpinnerFill from "./components/Spinner.jsx"; // Importe o seu componente de spinner
import { useState, useEffect } from "react";
import Home from "../src/pages/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeCliente from "./pages/HomeCliente.jsx";
import Blog from "./pages/Blog.jsx";
import PerfilCliente from '../src/pages/PerfilCliente.jsx';
import { Helmet } from "react-helmet";
import MeusVeiculos from "./pages/MeusVeiculos.jsx";
import BlogAcess from "./pages/BlogAcess.jsx";
import VerAgendamento from "./pages/VerAgendamento.jsx";
import VerVeiculos from "./pages/VerVeiculos.jsx";
import HomeAdministrador from "./pages/pageAdmin/HomeAdministrador.jsx";
import LoginAdmin from "./components/compenentesAdmin/LoginAdmin.jsx";
import PaginaLoginSuperAdmin from './pages/pageAdmin/PaginaLoginSuperAdmin.jsx';
import { Navigate } from 'react-router-dom';

//importacoes para clientes
import Clientes from './pages/pageAdmin/Clientes.jsx';
import Estoque from './pages/pageAdmin/Estoque.jsx';
import Agendamento from './pages/pageAdmin/Agendamento.jsx';
import Ajuda from "./pages/Ajuda.jsx";
import Funcionarios from "./pages/pageAdmin/Funcionarios.jsx";
//import DashBoard from "./pages/pageAdmin/DashBoard.jsx";

// Componente de rota protegida

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Exemplo de verificação de autenticação

  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando um carregamento de dados
    const fetchData = async () => {
      // Simula um atraso
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false); // Dados carregados
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <>
          <SpinnerFill />
        </>
      ) : (
        <div>
          <Helmet>
            <title>Bi-Turbo Motores</title>
            <meta name="description" content="Oficina mecâncica" />
          </Helmet>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/HomeCliente" element={
                <ProtectedRoute>
                  <HomeCliente />
                </ProtectedRoute>}
              />
              <Route path="/Blog" element={
                <Blog />
              } />
              <Route path="/perfilCliente" element={
                <ProtectedRoute>
                  <PerfilCliente />
                </ProtectedRoute>
              } />
              <Route path="/meusVeiculos" element={
                <ProtectedRoute>
                  <MeusVeiculos />
                </ProtectedRoute>
              } />
              <Route path="/blogAcess" element={
                <ProtectedRoute>
                  <BlogAcess />
                </ProtectedRoute>
              } />
              <Route path="/verAgendamento" element={
                <ProtectedRoute>
                  <VerAgendamento />
                </ProtectedRoute>
              } />
              <Route path="/verVeiculos" element={

                <ProtectedRoute>
                  <VerVeiculos />
                </ProtectedRoute>
              } />
              <Route path="/pedidoAjuda" element={
                <ProtectedRoute>
                  <Ajuda />
                </ProtectedRoute>
              } />

              {/**Routas para o Administrador */}
              <Route path="/homeAdministrador" element={<HomeAdministrador />} />
              <Route path="/acessoAdministrador" element={<LoginAdmin />} />
              <Route path="/clienteList" element={<Clientes />} />
              <Route path="/funcionariosList" element={<Funcionarios />} />
              <Route path="/estoqueList" element={<Estoque />} />

             {/**Routas para o Super Administrador */}

              <Route path="/acessoSuperAdministrador" element={<PaginaLoginSuperAdmin />} />
              <Route path="/paginaCliente" element={<Clientes />} />
              <Route path="/paginaAdministrador" element={<Agendamento />} />
              <Route path="/paginaEstoque" element={<Estoque />} />



           </Routes>
           </Router>
           </div>
         )}
       </div>
     );
   };
   
   
   export default App;