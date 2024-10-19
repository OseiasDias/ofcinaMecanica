import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import '../css/modalCadVeiculo.css';


export default function ModalCadastrarVeiculo(props) {

    const [formData, setFormData] = useState({
        marca: "",
        modelo: "",
        ano: "",
        placa: "",
        fotos: null,
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let formErrors = {};

        // Validação da Marca
        if (!formData.marca) {
            formErrors.marca = "Marca é obrigatória";
        } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.marca)) {
            formErrors.marca = "A marca deve conter apenas letras, números e os caracteres / . -";
        }

        // Validação do Modelo
        if (!formData.modelo) {
            formErrors.modelo = "Modelo é obrigatório";
        } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.modelo)) {
            formErrors.modelo = "O modelo deve conter apenas letras, números e os caracteres / . -";
        }

        // Validação do Ano
        if (!formData.ano) {
            formErrors.ano = "Ano é obrigatório";
        } else if (!/^\d{4}$/.test(formData.ano) || formData.ano < 1900 || formData.ano > new Date().getFullYear()) {
            formErrors.ano = `Ano inválido. O ano deve estar entre 1900 e ${new Date().getFullYear()}`;
        }

        // Validação da Placa
        if (!formData.placa) {
            formErrors.placa = "Placa é obrigatória";
        } else if (!/^[a-zA-Z0-9\s/. -]+$/.test(formData.placa)) {
            formErrors.placa = "A Placa deve conter apenas letras, números e os caracteres / . -";
        }

        // Validação das Fotos
        if (!formData.fotos) {
            formErrors.fotos = "Envie pelo menos uma foto";
        }

        return formErrors;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            console.log("Veículo cadastrado:", formData);
            alert("Veículo cadastrado com sucesso!");
            // Aqui pode-se enviar os dados para o backend ou fazer outra ação.
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

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            fotos: e.target.files[0],
        });
    };


    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
           <div className='bordarModal'>
           <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5>Cadastre o seu veiculo</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form onSubmit={handleSubmit} >
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
                        <Form.Control.Feedback type="invalid">
                            {errors.marca}
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            {errors.modelo}
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            {errors.ano}
                        </Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">
                            {errors.placa}
                        </Form.Control.Feedback>
                    </Form.Group>
                        </div>

                        <div className="col-12 col-md-12 col-lg-6">
                    <Form.Group>
                        <Form.Label>Fotos</Form.Label>
                        <Form.Control
                            type="file"
                            name="fotos"
                            accept="image/*"
                            onChange={handleFileChange}
                            isInvalid={!!errors.fotos}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.fotos}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </div>
                    </div>
                    <Button variant="primary" type="submit" className="mt-3 d-block mx-auto links-acessos">
                        Cadastrar Veículo
                    </Button>
                   
                </Form>
            </Modal.Body>

            <Modal.Footer>
            </Modal.Footer>
           </div>
        </Modal >
    );
}
