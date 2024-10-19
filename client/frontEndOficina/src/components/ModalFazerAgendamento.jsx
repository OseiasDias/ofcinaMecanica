import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function ModalFazerAgendamento(props) {
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
        const today = new Date();
        const selectedDate = new Date(formData.data);
        
        if (!formData.data) {
            formErrors.data = "A data é obrigatória";
        } else if (selectedDate < today) {
            formErrors.data = "A data não pode ser no passado";
        } else if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
            formErrors.data = "Agendamentos não podem ser feitos para fins de semana";
        }

        // Validação do ID do veículo
        if (!formData.id_veiculo) {
            formErrors.id_veiculo = "O ID do veículo é obrigatório";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            console.log("Agendamento de Manutenção:", formData);
            alert("Manutenção agendada com sucesso!");
            setFormData({ descricao: '', data: '', id_veiculo: '' });
            setErrors({});
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
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="bordarModal">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5> Agendar Manutenção</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row justify-content-center difinirFundo">
                        <div className="col-12 col-md-12 col-lg-12">
                            <Form onSubmit={handleSubmit} className='descricao'>
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

                                <div className="row">
                                    <div className="col-12 col-md-12 col-lg-6">
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
                                    </div>
                                    <div className="col-12 col-md-12 col-lg-6">
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
                                    </div>
                                </div>

                                <Button variant="primary" type="submit" className="mt-3 py-2 px-5 d-block mx-auto links-acessos">
                                    Agendar
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            </div>
        </Modal>
    );
}
