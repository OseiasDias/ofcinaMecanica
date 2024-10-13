import SpinnerFill from "./components/Spinner.jsx"; // Importe o seu componente de spinner
import { useState, useEffect } from "react";
import Home from "../src/pages/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeCliente from "./pages/HomeCliente.jsx";
import Blog from "./pages/Blog.jsx";
import PerfilCliente from '../src/pages/PerfilCliente.jsx';
import { Helmet } from "react-helmet";
import CadastrarVeiculo from "./pages/CadastrarVeiculo.jsx";
import MeusVeiculos from "./pages/MeusVeiculos.jsx";

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
        <title>Oficina Mecâncica</title>
        <meta name="description" content="Oficina mecâncica" />
      </Helmet>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/HomeCliente" element={<HomeCliente />} />
              <Route path="/Blog" element={<Blog />} />
              <Route path="/perfilCliente" element={<PerfilCliente />} />
              <Route path="/cadastroVeiculos" element={<CadastrarVeiculo />} />
              <Route path="/meusVeiculos" element={<MeusVeiculos />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
