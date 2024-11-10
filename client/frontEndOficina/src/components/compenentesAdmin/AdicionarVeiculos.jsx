import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdicionarVeiculo() {
  const [formData, setFormData] = useState({
    marca: 'Fiat',             // Marca preenchida
    modelo: 'Punto',           // Modelo preenchido
    ano: 2010,                 // Ano preenchido
    placa: 'LD-34-23-W13',     // Placa preenchida
    id_cliente: 2,             // id_cliente preenchido
    fotos: null,               // Campo fotos (pode ser null por enquanto)
    status_reparacao: 'Pronto a Iniciar',  // Status de reparação preenchido
  });

  const [errors, setErrors] = useState({});

  // Validação do formulário
  const validate = () => {
    const formErrors = {};

    // Validação da Marca
    if (!formData.marca) {
      formErrors.marca = 'Marca é obrigatória';
    }

    // Validação do Modelo
    if (!formData.modelo) {
      formErrors.modelo = 'Modelo é obrigatório';
    }

    // Validação do Ano
    if (!formData.ano) {
      formErrors.ano = 'Ano é obrigatório';
    } else if (!/^\d{4}$/.test(formData.ano) || formData.ano < 1900 || formData.ano > new Date().getFullYear()) {
      formErrors.ano = `Ano inválido. O ano deve estar entre 1900 e ${new Date().getFullYear()}`;
    }

    // Validação da Placa
    if (!formData.placa) {
      formErrors.placa = 'Placa é obrigatória';
    }

    return formErrors;
  };

  // Envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      const dataToSend = new FormData();
      dataToSend.append('marca', formData.marca);
      dataToSend.append('modelo', formData.modelo);
      dataToSend.append('ano', formData.ano);
      dataToSend.append('placa', formData.placa);
      dataToSend.append('id_cliente', formData.id_cliente);  // Campo id_cliente
      dataToSend.append('fotos', formData.fotos);  // Campo fotos (null por padrão)
      dataToSend.append('status_reparacao', formData.status_reparacao);  // Campo status_reparacao

      try {
        const response = await fetch('http://localhost:5000/api/veiculos', {
          method: 'POST',
          body: dataToSend,
        });

        if (!response.ok) {
          throw new Error('Erro ao cadastrar veículo');
        }

        const data = await response.json();
        toast.success('Veículo cadastrado com sucesso!');
        console.log('Veículo cadastrado:', data);

        // Limpa o formulário após o sucesso
        setFormData({
          marca: '',
          modelo: '',
          ano: '',
          placa: '',
          id_cliente: 2,  // Reseta o valor padrão para id_cliente
          //fotos: null,  // Reseta o valor padrão para fotos
          status_reparacao: 'pronto a começar',  // Reseta o valor padrão para status_reparacao
        });
      } catch (error) {
        toast.error(error.message || 'Erro ao cadastrar veículo. Tente novamente.');
      }
    } else {
      setErrors(formErrors);
    }
  };

  // Função para lidar com a mudança dos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container-fluid">
      <h6 className="mt-5">CADASTRO DE VEICULOS</h6>
      <hr />

      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                isInvalid={!!errors.marca}
                placeholder="Digite a marca do veículo"
              />
              <Form.Control.Feedback type="invalid">{errors.marca}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                isInvalid={!!errors.modelo}
                placeholder="Digite o modelo do veículo"
              />
              <Form.Control.Feedback type="invalid">{errors.modelo}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label>Ano</Form.Label>
              <Form.Control
                type="text"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                isInvalid={!!errors.ano}
                placeholder="Digite o ano do veículo"
              />
              <Form.Control.Feedback type="invalid">{errors.ano}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label>Placa</Form.Label>
              <Form.Control
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                isInvalid={!!errors.placa}
                placeholder="Digite a placa do veículo"
              />
              <Form.Control.Feedback type="invalid">{errors.placa}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label>ID do Cliente</Form.Label>
              <Form.Control
                type="number"
                name="id_cliente"
                value={formData.id_cliente}
                readOnly
                placeholder="ID do cliente"
              />
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label>Status de Reparação</Form.Label>
              <Form.Control
                as="select"
                name="status_reparacao"
                value={formData.status_reparacao}
                onChange={handleChange}
              >
                <option value="pronto a começar">Pronto a Começar</option>
                <option value="em andamento">Em Andamento</option>
                <option value="concluído">Concluído</option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <Button variant="primary" type="submit" className="mt-3 d-block mx-auto">
          Cadastrar Veículo
        </Button>
      </Form>

      <ToastContainer
        position="top-right"
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
