
import SpinnerFill from './components/Spinner.jsx'; // Importe o seu componente de spinner
import  { useState, useEffect } from 'react';
import Home from '../src/pages/Home.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando um carregamento de dados
    const fetchData = async () => {
      // Simula um atraso
      await new Promise(resolve => setTimeout(resolve, 2000));
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
          <Home />
        </div>
      )}
    </div>
  );
};

export default App;
