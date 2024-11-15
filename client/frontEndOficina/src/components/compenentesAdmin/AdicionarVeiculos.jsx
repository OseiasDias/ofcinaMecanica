import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdicionarVeiculo() {
  // Estado do formulário
  const [formData, setFormData] = useState({
    marca: '',             // Marca começa vazia
    modelo: '',           // Modelo começa vazio
    ano: '',              // Ano começa vazio
    placa: '',            // Placa começa vazia
    id_cliente: '',       // ID do cliente começa vazio
    fotos: null,          // Campo fotos (null por enquanto)
    status_reparacao: '', // Status de reparação começa vazio
  });

  // Estado de erro de validação
  const [errors, setErrors] = useState({});
  
  // Estado para armazenar os clientes da API
  const [clientes, setClientes] = useState([]);
  
  // Função de validação do formulário
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

    // Validação do ID do Cliente
    if (!formData.id_cliente) {
      formErrors.id_cliente = 'Selecione um cliente';
    }

    return formErrors;
  };

  // Carregar os clientes da API
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clientes');
        if (response.ok) {
          const data = await response.json();
          setClientes(data); // Armazena os clientes no estado
        } else {
          toast.error('Erro ao carregar clientes');
        }
      } catch (error) {
        toast.error('Erro ao carregar clientes');
      }
    };

    fetchClientes();
  }, []);

  // Envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      // Prepara os dados para envio
      const dataToSend = {
        marca: formData.marca,
        modelo: formData.modelo,
        ano: formData.ano,
        placa: formData.placa,
        id_cliente: formData.id_cliente,  // Campo id_cliente
        fotos: formData.fotos,  // Campo fotos (null por padrão)
        status_reparacao: formData.status_reparacao,  // Campo status_reparacao
      };

      try {
        // Envia os dados como JSON via fetch
        const response = await fetch('http://localhost:5000/api/veiculos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Envia como JSON
          },
          body: JSON.stringify(dataToSend), // Converte o objeto para JSON
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
          id_cliente: '',  // Reseta o valor para id_cliente
          fotos: null,  // Reseta o valor para fotos
          status_reparacao: '',  // Reseta o valor para status_reparacao
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
      <h6 className="mt-5 fw-bold">CADASTRO DE VEICULOS</h6>
      <hr />

      <Form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label className='fw-bold'>Marca</Form.Label>
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
              <Form.Label className='fw-bold'>Modelo</Form.Label>
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
              <Form.Label className='fw-bold'>Ano</Form.Label>
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
              <Form.Label className='fw-bold'>Placa</Form.Label>
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
              <Form.Label className='fw-bold'>ID do Cliente</Form.Label>
              <Form.Control
                as="select"
                name="id_cliente"
                value={formData.id_cliente}
                onChange={handleChange}
                isInvalid={!!errors.id_cliente}
              >
                <option value="">Selecione o Cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    <><p className='text-primary alinharParagrafoEspecial'><strong>{cliente.nome}</strong>- {cliente.email} - {cliente.telefone}
                    </p></> 
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.id_cliente}</Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col-12 col-md-12 col-lg-6">
            <Form.Group>
              <Form.Label className='fw-bold'>Status de Reparação</Form.Label>
              <Form.Control
                as="select"
                name="status_reparacao"
                value={formData.status_reparacao}
                onChange={handleChange}
              >
                <option value="">Selecione o Status</option>
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
