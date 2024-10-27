import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar o useNavigate
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ModalCadastrarCliente from './ModalCadastrarCliente';

export default function ModalLogin({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalShowCadastro, setModalShowCadastro] = useState(false);

  const navigate = useNavigate();

  // Valida o email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('E-mail é obrigatório.');
      return false;
    } else if (!emailRegex.test(email) || !email.endsWith('.com')) {
      setEmailError('Por favor, digite um e-mail válido.');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Valida a senha
  const validateSenha = (senha) => {
    if (!senha) {
      setSenhaError('Senha é obrigatória.');
      return false;
    }
    setSenhaError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isSenhaValid = validateSenha(senha);

    if (!isEmailValid || !isSenhaValid) {
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/clientes/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (!response.ok) {
            setGeneralError('Verifique as credenciais que inseriste não está associado a uma conta.');
            return;
        }

        const data = await response.json();
        
        // Salva o token de autenticação no localStorage
        localStorage.setItem('authToken', data.token); 

        // Redireciona após um atraso de 3 segundos (3000 milissegundos)
        setTimeout(() => {
            navigate('/HomeCliente');
        }, 1000); // Atraso de 1 segundos

    } catch (error) {
        setGeneralError('Erro ao conectar ao servidor.');
    }
}

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <div className="modalBeleza">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Faça seu login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Digite seu email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicSenha" className="mt-3">
              <Form.Label>Senha</Form.Label>
              <div className="d-flex">
                <Form.Control 
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha" 
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  isInvalid={!!senhaError}
                />
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="ms-2"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">{senhaError}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="links-acessos mt-3 px-5 mx-auto d-block">
              Entrar
            </Button>

            {/* Exibe o erro geral abaixo do formulário, se existir */}
            {generalError && (
              <p className="text-danger px-3 text-center mt-3">{generalError}</p>
            )}
          </Form>
        </Modal.Body>
        <hr />
        <p className='text-center'><strong className='melhorarStrong'>Esqueceste a sua senha?</strong></p>
        <p className='text-center'>Não tens uma conta? <strong className='melhorarStrong' onClick={() => setModalShowCadastro(true)}>Registar</strong></p>

        <ModalCadastrarCliente show={modalShowCadastro} onHide={() => setModalShowCadastro(false)} />
      </div>
    </Modal>
  );
}
