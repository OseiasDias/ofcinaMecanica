import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/agendarManutencao.css';


const AgendamentoManutencao = () => {
  const [formData, setFormData] = useState({
    descricao: '',
    data: '',
    id_veiculo: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    // Validação da descrição
    if (!formData.descricao) {
      formErrors.descricao = "A descrição é obrigatória";
    }

    // Validação da data
    if (!formData.data) {
      formErrors.data = "A data é obrigatória";
    }

    // Validação do ID do veículo
    if (!formData.id_veiculo) {
      formErrors.id_veiculo = "O ID do veículo é obrigatório";
    }

    return formErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      console.log("Agendamento de Manutenção:", formData);
      alert("Manutenção agendada com sucesso!");
      setFormData({ descricao: '', data: '', id_veiculo: '' });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container-fluid">

      <div className="row justify-content-center difinirFundo">
        <div className="col-12 col-md-10 col-lg-5 MeuLado">
          <h3 className='d-none'>Agendar Manut</h3>
        </div>

        <div className="col-12 col-md-10 col-lg-7 px-5">
          <Form onSubmit={handleSubmit} className='descricao'>
            <h4>Agendar Manutenção</h4>
            <Form.Group controlId="descricao">
              <Form.Label>Descrição do Objetivo de Manutenção</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descricao"
                placeholder="Descreva o objetivo da manutenção"
                value={formData.descricao}
                onChange={handleChange}
                isInvalid={!!errors.descricao}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descricao}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="data" className="mt-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                isInvalid={!!errors.data}
              />
              <Form.Control.Feedback type="invalid">
                {errors.data}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="id_veiculo" className="mt-3">
              <Form.Label>ID do Veículo</Form.Label>
              <Form.Control
                type="text"
                name="id_veiculo"
                placeholder="Digite o ID do veículo"
                value={formData.id_veiculo}
                onChange={handleChange}
                isInvalid={!!errors.id_veiculo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.id_veiculo}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 py-2 px-5 d-block mx-auto links-acessos">
              Agendar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AgendamentoManutencao;
