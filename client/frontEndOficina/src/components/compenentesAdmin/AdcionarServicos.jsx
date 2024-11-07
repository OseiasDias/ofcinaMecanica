import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function CadastroServico() {
  const [formValues, setFormValues] = useState({
    nome_servico: '',
    descricao: '',
    preco: ''
    // A data de publicação será gerada automaticamente no back-end
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

    // Validação do nome do serviço
    if (!formValues.nome_servico) {
      newErrors.nome_servico = 'Nome do serviço é obrigatório.';
    }

    // Validação da descrição
    if (!formValues.descricao) {
      newErrors.descricao = 'Descrição do serviço é obrigatória.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função de envio do cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/servicos', {
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
      toast.success("Serviço cadastrado com sucesso!");

      // Resetando os valores após cadastro bem-sucedido
      setFormValues({
        nome_servico: '',
        descricao: '',
      });

      setErrors({});
    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
    }
  };

  return (
    <>
      <h6 className="mt-5">CADASTRAR SERVIÇO</h6>
      <hr />
      <Form onSubmit={handleCadastro} className="row">
        {/* Nome do Serviço */}
        <Form.Group className="col-12 my-2" controlId="formNomeServico">
          <Form.Label>Nome do Serviço</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do serviço"
            name="nome_servico"
            value={formValues.nome_servico}
            onChange={handleInputChange}
            isInvalid={!!errors.nome_servico}
          />
          <Form.Control.Feedback type="invalid">{errors.nome_servico}</Form.Control.Feedback>
        </Form.Group>

        {/* Descrição */}
        <Form.Group className="col-12 my-2" controlId="formDescricao">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Digite a descrição do serviço"
            name="descricao"
            value={formValues.descricao}
            onChange={handleInputChange}
            isInvalid={!!errors.descricao}
          />
          <Form.Control.Feedback type="invalid">{errors.descricao}</Form.Control.Feedback>
        </Form.Group>

        {/* Botão para cadastrar */}
        <div className="btnEv w-100">
          <Button variant="primary" type="submit" className="mt-4 d-block mx-auto links-acessos w-50">Cadastrar Serviço</Button>
        </div>
      </Form>

      {/* Container para Toasts de sucesso ou erro */}
      <ToastContainer position="top-center" />
    </>
  );
}
