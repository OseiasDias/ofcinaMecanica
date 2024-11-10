import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importando o hook useNavigate
import Spinner from 'react-bootstrap/Spinner'; // Importando o Spinner
import 'react-toastify/dist/ReactToastify.css';

export default function CadastrarCliente() {
  const navigate = useNavigate(); // Instanciando o hook navigate para redirecionamento
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    dataNascimento: '', // Não será mais obrigatório
    endereco: '',
    genero: 'Masculino', // Gênero com valor padrão
    estado: 1,  // Estado fixo com valor 1
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento do botão

  // Função para gerar senha aleatória com no mínimo 8 caracteres
  const generateRandomPassword = () => {
    let password = Math.random().toString(36).slice(-10);  // Gera uma senha aleatória de pelo menos 8 caracteres
    return password.length < 8 ? password + Math.random().toString(36).slice(-2) : password;  // Garantir que a senha tenha no mínimo 8 caracteres
  };

  // Gera uma senha ao carregar o componente
  useEffect(() => {
    const senhaGerada = generateRandomPassword();
    setFormValues(prevValues => ({
      ...prevValues,
      senha: senhaGerada,
    }));
    console.log('Senha gerada:', senhaGerada); // Exibe a senha gerada no console
  }, []); // Executa apenas uma vez, quando o componente for montado

  // Quando o usuário digita no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const hoje = new Date().toISOString().split('T')[0]; // Dados atuais no formato aaaa-mm-dd

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!formValues.nome) {
      newErrors.nome = 'Nome é obrigatório.';
    } else if (!nomeRegex.test(formValues.nome)) {
      newErrors.nome = 'O nome não pode conter números ou caracteres especiais.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!formValues.telefone) {
      newErrors.telefone = 'Telefone é obrigatório.';
    } else if (!/^\d{9,}$/.test(formValues.telefone)) {
      newErrors.telefone = 'Telefone deve conter pelo menos 9 dígitos.';
    }

    if (!formValues.senha) {
      newErrors.senha = 'Senha é obrigatória.';
    } else if (formValues.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres.';
    }

    // Remover a validação de obrigatoriedade para a data de nascimento
    if (formValues.dataNascimento && formValues.dataNascimento > hoje) {
      newErrors.dataNascimento = "A data de nascimento não pode ser maior que a data atual.";
    }

    if (!formValues.endereco) {
      newErrors.endereco = "Endereço é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // Ativa o spinner ao iniciar o processo de cadastro

    // Envio com JSON (não FormData)
    try {
      const response = await fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formValues.nome,
          email: formValues.email,
          telefone: formValues.telefone,
          senha: formValues.senha,
          dataNascimento: formValues.dataNascimento,
          endereco: formValues.endereco,
          genero: formValues.genero,
          estado: formValues.estado,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Cadastro não realizado: ${errorData.message || 'Verifique os dados. Email e telefone já existem.'}`);
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }

      const data = await response.json();
      toast.success(`Cadastro realizado com sucesso!`);

      // Aguarda o tempo da notificação ser fechada (5 segundos) antes de redirecionar
      setTimeout(() => {
        navigate('/clienteList');
      }, 5000); // 5000 ms é o tempo de exibição do toast

    } catch (error) {
      toast.error('Erro ao conectar ao servidor: ' + error.message);
      setIsLoading(false); // Desativa o spinner em caso de erro
    }
  };

  return (
    <div className="form-cadastro">
      <h6 className="mt-5">CADASTRAR CLIENTE</h6>
      <hr />
      <Form onSubmit={handleCadastro} className='row'>
        <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formNome">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            name="nome"
            value={formValues.nome}
            onChange={handleInputChange}
            isInvalid={!!errors.nome}
          />
          <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formTelefone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite seu telefone"
            name="telefone"
            value={formValues.telefone}
            onChange={handleInputChange}
            isInvalid={!!errors.telefone}
          />
          <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formDataNascimento">
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="dataNascimento"
            value={formValues.dataNascimento}
            onChange={handleInputChange}
            isInvalid={!!errors.dataNascimento}
          />
          <Form.Control.Feedback type="invalid">{errors.dataNascimento}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formEndereco">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu endereço"
            name="endereco"
            value={formValues.endereco}
            onChange={handleInputChange}
            isInvalid={!!errors.endereco}
          />
          <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formGenero">
          <Form.Label>Gênero</Form.Label>
          <Form.Control
            as="select"
            name="genero"
            value={formValues.genero}
            onChange={handleInputChange}
          >
            <option>Masculino</option>
            <option>Feminino</option>
            <option>Outro</option>
            <option>Prefiro não dizer</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='col-12 col-md-12 col-lg-6 my-1' controlId="formSenha">
          <Form.Label><strong>Senha gerada</strong></Form.Label>
          <div className="d-flex">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              name="senha"
              value={formValues.senha}
              onChange={handleInputChange}
              isInvalid={!!errors.senha}
              disabled={!!formValues.senha}  // Desabilita o campo se a senha já estiver gerada
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              className="ms-2"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </Button>
          </div>
          <Form.Control.Feedback type="invalid">{errors.senha}</Form.Control.Feedback>
        </Form.Group>

        {errors.server && <div className="text-danger mt-2">{errors.server}</div>}

        <div className="w-100">
          <Button 
            variant="primary" 
            type="submit" 
            className="links-acessos mt-3 px-5  mx-auto d-block" 
            disabled={isLoading} // Desabilita o botão quando está carregando
          >
            {isLoading ? 
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 
              "Cadastrar"
            }
          </Button>
        </div>
      </Form>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
