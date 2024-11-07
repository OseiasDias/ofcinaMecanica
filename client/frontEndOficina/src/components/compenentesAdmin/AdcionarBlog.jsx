import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CadastroBlog() {
  const [formValues, setFormValues] = useState({
    titulo: '',
    conteudo: '',
    // data_publicacao é definida automaticamente no momento de envio
    data_publicacao: new Date().toISOString(),  // Preenchendo com a data atual
  });

  const [errors, setErrors] = useState({});

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

    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Cadastro não realizado: ${errorData.message || 'Erro desconhecido.'}`);
        return;
      }

      // Caso o cadastro seja bem-sucedido
      toast.success("Blog cadastrado com sucesso!");

      // Resetando os valores após cadastro bem-sucedido
      setFormValues({
        titulo: '',
        conteudo: '',
        data_publicacao: new Date().toISOString(),  // Nova data gerada após cadastro
      });

      setErrors({});
    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
    }
  };

  return (
    <>
      <h6 className="mt-5">CADASTRAR BLOG</h6>
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

        {/* Não exibe o campo de data de publicação, ele é preenchido automaticamente no back-end */}
        
        {/* Botão para cadastrar */}
        <div className="btnEv w-100">
          <Button variant="primary" type="submit" className="mt-4 d-block mx-auto links-acessos w-50">Cadastrar Blog</Button>
        </div>
      </Form>

      {/* Container para Toasts de sucesso ou erro */}
      <ToastContainer   position="top-center"/>
    </>
  );
}
