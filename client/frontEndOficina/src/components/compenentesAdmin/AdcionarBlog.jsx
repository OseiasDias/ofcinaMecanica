import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'; // Spinner importado
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

export default function CadastroBlog() {
  const [formValues, setFormValues] = useState({
    titulo: '',
    conteudo: '',
    data_publicacao: new Date().toISOString(),
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const navigation = useNavigate(); // Navegação após sucesso

  // Função para lidar com as mudanças nos campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validação do formulário
  const validateForm = () => {
    const newErrors = {};
    // Validação do título
    if (!formValues.titulo) {
      newErrors.titulo = 'Título é obrigatório.';
    }
    // Validação do conteúdo
    if (!formValues.conteudo) {
      newErrors.conteudo = 'Conteúdo é obrigatório.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função de envio do cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true); // Ativa o spinner ao iniciar o processo de envio
    
    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Cadastro não realizado: ${errorData.message || 'Erro desconhecido.'}`);
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }

      // Caso o cadastro seja bem sucedido
      toast.success("Blog cadastrado com sucesso!");
      
      setTimeout(() => {
        navigation('/blogList');
      }, 5000);

    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
      setIsLoading(false); // Desativa o spinner em caso de erro
    }
  };

  return (
    <>
      <h6 className="mt-5">PUBLICAR BLOG</h6>
      <hr />
      <Form onSubmit={handleCadastro} className="row">
        {/* Título */}
        <Form.Group className="col-12 my-2" controlId="formTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Digite o título do blog" 
            name="titulo" 
            value={formValues.titulo} 
            onChange={handleInputChange} 
            isInvalid={!!errors.titulo} 
          />
          <Form.Control.Feedback type="invalid">{errors.titulo}</Form.Control.Feedback>
        </Form.Group>

        {/* Conteúdo */}
        <Form.Group className="col-12 my-2" controlId="formConteudo">
          <Form.Label>Conteúdo</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={5} 
            placeholder="Digite o conteúdo do blog" 
            name="conteudo" 
            value={formValues.conteudo} 
            onChange={handleInputChange} 
            isInvalid={!!errors.conteudo} 
          />
          <Form.Control.Feedback type="invalid">{errors.conteudo}</Form.Control.Feedback>
        </Form.Group>

        {/* Botão para cadastrar */}
        <div className="btnEv w-100">
          <Button 
            variant="primary" 
            type="submit" 
            className="mt-4 d-block mx-auto links-acessos px-5" 
            disabled={isLoading} // Desabilita o botão enquanto você está carregando
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Publicar Blog"
            )}
          </Button>
        </div>
      </Form>

      {/* Container para brindes de sucesso ou erro */}
      <ToastContainer position="top-center" />
    </>
  );
}
