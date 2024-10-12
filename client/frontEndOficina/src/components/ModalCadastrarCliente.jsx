import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../css/modalLogin.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// eslint-disable-next-line react/prop-types
export default function ModalCadastrarCliente({ show, onHide }) {
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '' // Changed from password to senha
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

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

    // Changed password validation to senha
    if (!formValues.senha) {
      newErrors.senha = 'Senha é obrigatória.'; // Changed from password to senha
    } else if (formValues.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres. Considere usar uma combinação de letras e números.'; // Changed from password to senha
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues), // Ensure this sends senha instead of password
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setErrors({ server: errorMessage || 'Erro ao fazer cadastro. Verifique os dados e tente novamente.' });
        toast.error(errorMessage || 'Erro ao fazer cadastro. Verifique os dados e tente novamente.');
        return;
      }

      const data = await response.json();
      console.log('Cadastro realizado com sucesso:', data);
      toast.success('Cadastro realizado com sucesso!');
      onHide();
    } catch (error) {
      console.error('Erro ao fazer cadastro:', error);
      setErrors({ server: 'Erro ao conectar ao servidor.' });
      toast.error('Erro ao conectar ao servidor.');
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="modalBeleza">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Cadastro de Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCadastro} className='row'>
              <Form.Group className='col-12 col-md-12 col-lg-6' controlId="formNome">
                <Form.Label>Nome</Form.Label>
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

              <Form.Group className='col-12 col-md-12 col-lg-6' controlId="formEmail">
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

              <Form.Group className='col-12 col-md-12 col-lg-6' controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu telefone"
                  name="telefone"
                  value={formValues.telefone}
                  onChange={handleInputChange}
                  isInvalid={!!errors.telefone}
                />
                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
              </Form.Group>

              {/* Changed password field to senha */}
              <Form.Group className='col-12 col-md-12 col-lg-6' controlId="formSenha">
                <Form.Label>Senha</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    name="senha" // Changed from password to senha
                    value={formValues.senha} // Changed from password to senha
                    onChange={handleInputChange}
                    isInvalid={!!errors.senha} // Changed from password to senha
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ms-2"
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">{errors.senha}</Form.Control.Feedback> {/* Changed from password to senha */}
              </Form.Group>

{/**              {errors.server && <div className="text-danger mt-2">{errors.server}</div>}
  */}
              <Button variant="primary" type="submit" className="links-acessos nnB mt-3 px-5 mx-auto d-block">
                Cadastrar
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}