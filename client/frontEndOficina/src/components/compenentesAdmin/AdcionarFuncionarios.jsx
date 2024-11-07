import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Importando o hook useNavigate
import "react-toastify/dist/ReactToastify.css";

export default function CadastrarFuncionario() {
  const navigate = useNavigate(); // Instanciando o hook navigate para redirecionamento
  const [formValues, setFormValues] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    nivelAcesso: "", // Campo específico para o tipo de funcionário
    genero: "", // Gênero com valor padrão
    endereco: "", // Endereço
    dataNascimento: "", // Data de nascimento
    estado: 1, // Estado fixo com valor 1
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Função para gerar senha aleatória com no mínimo 8 caracteres
  const generateRandomPassword = () => {
    let password = Math.random().toString(36).slice(-10); // Gera uma senha aleatória de pelo menos 8 caracteres
    return password.length < 8
      ? password + Math.random().toString(36).slice(-2)
      : password; // Garantir que a senha tenha no mínimo 8 caracteres
  };

  // Gera uma senha ao carregar o componente
  useEffect(() => {
    const senhaGerada = generateRandomPassword();
    setFormValues((prevValues) => ({
      ...prevValues,
      senha: senhaGerada,
    }));
    console.log("Senha gerada:", senhaGerada); // Exibe a senha gerada no console
  }, []); // Executa apenas uma vez, quando o componente for montado

  // Quando o usuário digita no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const hoje = new Date().toISOString().split("T")[0]; // Dados atuais no formato aaaa-mm-dd

    const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    if (!formValues.nome) {
      newErrors.nome = "Nome é obrigatório.";
    } else if (!nomeRegex.test(formValues.nome)) {
      newErrors.nome =
        "O nome não pode conter números ou caracteres especiais.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      newErrors.email = "E-mail é obrigatório.";
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = "E-mail inválido.";
    }

    if (!formValues.telefone) {
      newErrors.telefone = "Telefone é obrigatório.";
    } else if (!/^\d{9,}$/.test(formValues.telefone)) {
      newErrors.telefone = "Telefone deve conter pelo menos 9 dígitos.";
    }

    if (!formValues.senha) {
      newErrors.senha = "Senha é obrigatória.";
    } else if (formValues.senha.length < 6) {
      newErrors.senha = "Senha deve ter pelo menos 6 caracteres.";
    }

    if (formValues.dataNascimento && formValues.dataNascimento > hoje) {
      newErrors.dataNascimento =
        "A data de nascimento não pode ser maior que a data atual.";
    }

    if (!formValues.nivelAcesso) {
      newErrors.nivelAcesso = "Nível de acesso é obrigatório.";
    }

    if (!formValues.genero) {
      newErrors.genero = "Gênero é obrigatório.";
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

    // Envio com JSON (não FormData)
    try {
      const response = await fetch("http://localhost:5000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formValues.nome,
          email: formValues.email,
          telefone: formValues.telefone,
          senha: formValues.senha,
          nivel_acesso: formValues.nivelAcesso,
          genero: formValues.genero,
          endereco: formValues.endereco,
          data_nascimento: formValues.dataNascimento,
          estado: formValues.estado,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Cadastro não realizado: ${
            errorData.message ||
            "Verifique os dados. Email e telefone já existem."
          }`
        );
        return;
      }

      const data = await response.json();
      toast.success(`Cadastro realizado com sucesso!`);

      // Aguarda o tempo da notificação ser fechada (5 segundos) antes de redirecionar
      setTimeout(() => {
        navigate("/funcionariosList"); // Redireciona para a lista de funcionários
      }, 5000); // 5000 ms é o tempo de exibição do toast
    } catch (error) {
      toast.error("Erro ao conectar ao servidor: " + error.message);
    }
  };

  return (
    <div className="form-cadastro">
      <h6 className="mt-5">CADASTRAR FUNCIONÁRIO</h6>
      <hr />
      <Form onSubmit={handleCadastro} className="row">
        <Form.Group
          className="col-12 col-md-12 col-lg-6 my-1"
          controlId="formNome"
        >
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            name="nome"
            value={formValues.nome}
            onChange={handleInputChange}
            isInvalid={!!errors.nome}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nome}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="col-12 col-md-12 col-lg-6 my-1"
          controlId="formEmail"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="col-12 col-md-12 col-lg-6 my-1"
          controlId="formTelefone"
        >
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite seu telefone"
            name="telefone"
            value={formValues.telefone}
            onChange={handleInputChange}
            isInvalid={!!errors.telefone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.telefone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="col-12 col-md-12 col-lg-6 my-1"
          controlId="formDataNascimento"
        >
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control
            type="date"
            name="dataNascimento"
            value={formValues.dataNascimento}
            onChange={handleInputChange}
            isInvalid={!!errors.dataNascimento}
          />
          <Form.Control.Feedback type="invalid">
            {errors.dataNascimento}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="col-12 col-md-12 col-lg-6 my-1"
          controlId="formNivelAcesso"
        >
          <Form.Label>Nível de Acesso</Form.Label>
          <Form.Control
            as="select"
            name="nivelAcesso"
            value={formValues.nivelAcesso}
            onChange={handleInputChange}
            isInvalid={!!errors.nivelAcesso}
          >
            <option>Assistente Técnico</option>
            <option>Eletricista Automotivo</option>
            <option>Lavador de Veículos</option>
            <option>Gerente de Oficina</option>
            <option>Atendente/Recepcionista</option>
            <option>Estagiário</option>
            <option>Técnico em Diagnóstico</option>
            <option>Mecânico</option> {/* Adicionada a opção "Mecânico" */}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.nivelAcesso}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
  className="col-12 col-md-12 col-lg-6 my-1"
  controlId="formGenero"
>
  <Form.Label>Gênero</Form.Label>
  <Form.Control
    as="select"
    name="genero"
    value={formValues.genero}
    onChange={(e) => {
      handleInputChange(e); // Verifique se a função está sendo chamada corretamente
      console.log("Genero selecionado:", e.target.value); // Debug: verifique o valor
    }}
    isInvalid={!!errors.genero}
  >
    <option value="">Selecione um gênero</option> {/* Adicionando uma opção padrão */}
    <option value="Masculino">Masculino</option>
    <option value="Feminino">Feminino</option>
    <option value="Outro">Outro</option>
  </Form.Control>
  <Form.Control.Feedback type="invalid">
    {errors.genero}
  </Form.Control.Feedback>
</Form.Group>


        <Form.Group
          className="col-12 col-md-12 col-lg-6 my-1"
          controlId="formEndereco"
        >
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o endereço"
            name="endereco"
            value={formValues.endereco}
            onChange={handleInputChange}
            isInvalid={!!errors.endereco}
          />
          <Form.Control.Feedback type="invalid">
            {errors.endereco}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          className="col-12 col-md-12 col-lg-6 my-1"
          controlId="formSenha"
        >
          <Form.Label>
            <strong>Senha gerada</strong>
          </Form.Label>
          <div className="d-flex">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              name="senha"
              value={formValues.senha}
              onChange={handleInputChange}
              isInvalid={!!errors.senha}
              disabled={!!formValues.senha} // Desabilita o campo se a senha já estiver gerada
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              className="ms-2"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </Button>
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.senha}
          </Form.Control.Feedback>
        </Form.Group>

        {errors.server && (
          <div className="text-danger mt-2">{errors.server}</div>
        )}

        <div className="w-100">
          <Button
            variant="primary"
            type="submit"
            className="mt-4 links-acessos px-5 mx-auto w-50 d-block"
          >
            Cadastrar
          </Button>
        </div>
      </Form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
