import SpinnerFill from './components/Spinner.jsx'; // Importe o seu componente de spinner
import  { useState, useEffect } from 'react';


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
          <h1>Dados Carregados!</h1>
          {/* Coloque seus dados aqui */}
        </div>
      )}
    </div>
  );
};

export default App;
