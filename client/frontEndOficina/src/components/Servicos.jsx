import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdMiscellaneousServices } from "react-icons/md";
import '../css/servicos.css';
import { ImEyeBlocked } from "react-icons/im";
import { IoCalendarNumberOutline } from "react-icons/io5";


export default function Servicos() {
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false); // Novo estado para controlar a exibição

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

    const handleShowAll = () => {
        setShowAll(true); // Define o estado para mostrar todos os serviços
    };

    if (loading) return <p>Carregando serviços...</p>;
    if (error) return <p>Erro ao carregar serviços: {error}</p>;

    return (
        <>
            <div className="seccao-cor pb-5">
                <div className="container">
                    <h2 className='titulo-secao text-center'>Conheça a nossa diversidade de serviços</h2>
                    <div className='row'>
                        {servicos.slice(0, showAll ? servicos.length : 9).map (servico => (
                            <div key={servico.id_servico} className="servico-item mt-3 col-12 col-md-6 col-lg-4 h-100">
                                <div className="margem h-100">
                                    <MdMiscellaneousServices fontSize={48} color='#0070fa' className='my-2' />
                                    <h5 className='fw-bold my-2'>{servico.nome_servico}</h5>
                                    <p>{servico.descricao}</p>
                                    <p><strong>Agende uma avaliação! <IoCalendarNumberOutline fontSize={24} /></strong></p>
                                {/**                                    <p>A partir de: <strong><GiMoneyStack fontSize={25}/> {parseFloat(servico.preco).toFixed(2)}</strong> kz</p>
 */}
                                </div>
                            </div>
                        ))}
                    </div>
                    {!showAll && ( // Mostra o botão apenas se não estiver mostrando todos
                        <div className="text-center mt-3">
                            <button onClick={handleShowAll} className="btn btn-primary links-acessos w-50 my-4">Ver mais <ImEyeBlocked fontSize={25} /></button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}