import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Importando o hook useNavigate
import Spinner from "react-bootstrap/Spinner"; // Importando o Spinner
import "react-toastify/dist/ReactToastify.css";
import { BsCalendar2 } from "react-icons/bs";
import { FaBalanceScale, FaWrench } from "react-icons/fa";

export default function AdicionarProdutoEstoque() {
  const navigate = useNavigate(); // Instanciando o hook navigate para redirecionamento
  const [formValues, setFormValues] = useState({
    nome_peca: "",
    quantidade: 0,
    data_reposicao: "", // A data de reposição será preenchida automaticamente
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento do botão

  // Função para pegar a data atual no formato correto para a data de reposição
  useEffect(() => {
    const dataAtual = new Date().toISOString(); // Pega a data atual no formato ISO 8601
    setFormValues((prevValues) => ({
      ...prevValues,
      data_reposicao: dataAtual,
    }));
  }, []); // Executa apenas uma vez, quando o componente for montado

  // Quando o usuário digita no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.nome_peca) {
      newErrors.nome_peca = "Nome da peça é obrigatório.";
    }

    if (formValues.quantidade <= 0) {
      newErrors.quantidade = "A quantidade deve ser maior que zero.";
    }

    if (!formValues.data_reposicao) {
      newErrors.data_reposicao = "Data de reposição é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true); // Ativa o spinner ao iniciar o processo de cadastro

    try {
      const response = await fetch("http://localhost:5000/api/estoque", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_peca: formValues.nome_peca,
          quantidade: formValues.quantidade,
          data_reposicao: formValues.data_reposicao,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(
          `Cadastro não realizado: ${errorData.message || "Erro desconhecido."}`
        );
        setIsLoading(false); // Desativa o spinner em caso de erro
        return;
      }

      toast.success(`Produto cadastrado com sucesso!`);
      setFormValues({
        nome_peca: "",
        quantidade: 0,
        data_reposicao: new Date().toISOString(), // Resetando a data de reposição
      });

      // Aguarda o tempo da notificação ser fechada (5 segundos) antes de redirecionar
      setTimeout(() => {
        navigate("/estoqueList"); // Redireciona para a lista de estoque
      }, 5000); // 5000 ms é o tempo de exibição do toast

    } catch (error) {
      toast.error("Erro ao conectar ao servidor: " + error.message);
      setIsLoading(false); // Desativa o spinner em caso de erro
    }
  };

  return (
    <div className="form-cadastro">
      <h6 className="mt-5 fw-bold">CADASTRAR PRODUTO NO ESTOQUE</h6>
      <hr />
      <Form onSubmit={handleCadastro} className="row">
        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formNomePeca">
          <Form.Label className="fw-bold">Nome da Peça</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaWrench fontSize={20} color="#0070fa" /></span>

          <Form.Control
            type="text"
            placeholder="Digite o nome da peça"
            name="nome_peca"
            value={formValues.nome_peca}
            onChange={handleInputChange}
            isInvalid={!!errors.nome_peca}
          />
          <Form.Control.Feedback type="invalid">{errors.nome_peca}</Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formQuantidade">
          <Form.Label className="fw-bold">Quantidade</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><FaBalanceScale fontSize={20} color="#0070fa" /></span>

          <Form.Control
            type="number"
            placeholder="Digite a quantidade"
            name="quantidade"
            value={formValues.quantidade}
            onChange={handleInputChange}
            isInvalid={!!errors.quantidade}
          />
          <Form.Control.Feedback type="invalid">{errors.quantidade}</Form.Control.Feedback>
        
          </div>
        </Form.Group>

        <Form.Group className="col-12 col-md-12 col-lg-6 my-1" controlId="formDataReposicao">
          <Form.Label className="fw-bold">Data de Reposição</Form.Label>
          <div className="input-group">
            <span className="input-group-text"><BsCalendar2 fontSize={20} color="#0070fa" /></span>

          <Form.Control
            type="datetime-local"
            name="data_reposicao"
            value={formValues.data_reposicao}
            onChange={handleInputChange}
            isInvalid={!!errors.data_reposicao}
            disabled={true} // A data é automaticamente preenchida, não editável
          />
          <Form.Control.Feedback type="invalid">{errors.data_reposicao}</Form.Control.Feedback>
          </div>
        </Form.Group>

        <div className="w-100">
          <Button
            variant="primary"
            type="submit"
            className="mt-4 links-acessos px-5 mx-auto  d-block"
            disabled={isLoading} // Desabilita o botão quando está carregando
          >
            {isLoading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "Cadastrar Produto"
            )}
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
