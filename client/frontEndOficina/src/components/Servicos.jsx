import  { useEffect, useState } from 'react';
import axios from 'axios';
import { MdMiscellaneousServices } from "react-icons/md";
import '../css/servicos.css';


export default function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/servicos');
                setServicos(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServicos();
    }, []);

    if (loading) return <p>Carregando serviços...</p>;
    if (error) return <p>Erro ao carregar serviços: {error}</p>;

    return (
        <>
           <div className="seccao-cor">
            <div className="container">
            <h2 className='titulo-secao text-center'>Conheça os nossos serviços</h2>
            <div className='row'>
                {servicos.map(servico => (
                    <div key={servico.id_servico} className="servico-item mt-3 col-12 col-md-6 col-lg-4 h-100">
                        <div className="margem h-100">
                        <MdMiscellaneousServices fontSize={48} color='#0070fa' className='my-2' />
                        <h5>{servico.nome_servico}</h5>
                        <p>{servico.descricao}</p>
                        <p>Apartir de:  <><strong>{parseFloat(servico.preco).toFixed(2)}</strong></> kz</p>
                        
                        </div>
                    </div>
                ))}
            </div>
            </div>
           </div>
        </>
    );
}