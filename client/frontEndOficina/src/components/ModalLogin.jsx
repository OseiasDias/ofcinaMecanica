import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import '../css/modalLogin.css';

// eslint-disable-next-line react/prop-types
export default function ModalLogin({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); // Utilizando "senha" ao invés de "password"
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(''); // Estado para mensagem de erro de login
  const [loginSuccess, setLoginSuccess] = useState(''); // Estado para mensagem de sucesso de login

  // Função para validar email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('E-mail é obrigatório.');
      return false;
    } else if (!emailRegex.test(email) || !email.endsWith('.com')) {
      setEmailError('Por favor, digite um e-mail válido que contenha "@" e termine com ".com".');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/clientes/login', { // Usando a URL correta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }), // Utilizando "senha" ao invés de "password"
      });

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        const errorMessage = await response.text(); // Obtém a resposta como texto
        setLoginError(errorMessage || 'Erro ao fazer login. Verifique suas credenciais.');
        setLoginSuccess('');
        return; // Não prossegue se a resposta não for 200
      }

      const data = await response.json(); // Apenas analisa o JSON se a resposta for ok

      // Lógica para quando o login for bem-sucedido
      setLoginSuccess('Login realizado com sucesso!');
      setLoginError('');
      console.log('Login bem-sucedido:', data);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoginError('Erro ao conectar ao servidor.');
      setLoginSuccess('');
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modalBeleza">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Faça seu login
          </Modal.Title>
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
              <Form.Control.Feedback type="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicSenha" className="mt-3"> {/* Usando "senha" ao invés de "password" */}
              <Form.Label>Senha</Form.Label>
              <div className="d-flex">
                <Form.Control 
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha" 
                  value={senha} // Usando "senha"
                  onChange={(e) => setSenha(e.target.value)} // Usando setSenha
                />
                <Button 
                  variant="outline-secondary" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="ms-2"
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </Button>
              </div>
            </Form.Group>

            {loginError && <div className="text-danger mt-2">{loginError}</div>}
            {loginSuccess && <div className="text-success mt-2">{loginSuccess}</div>}

            <Button variant="primary" type="submit" className="links-acessos mt-3 px-5 mx-auto d-block">
              Entrar
            </Button>
          </Form>
        </Modal.Body>
        <hr />
        <p className='text-center'><strong className='melhorarStrong'>Esqueceste a sua senha?</strong></p>
        <p className='text-center'>Não tens uma conta? <strong className='melhorarStrong'>Registar</strong></p>
      </div>
    </Modal>
  );
}
