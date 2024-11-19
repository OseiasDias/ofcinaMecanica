import '../../css/StylesAdmin/loginAdmin.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import ModalAcessoSuperAdmin from './ModalAcessoSuperAdmin.jsx';
import logoFoto from "../../assets/img/lgo.png";
import { toast } from 'react-toastify'; // Importa o Toastify
import { useNavigate } from 'react-router-dom'; // UseNavigate para navegação no React Router v6

export default function AtalhoLoginAdmin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [emailError, setEmailError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(''); // Estado para erro de login
    const [loginSuccess, setLoginSuccess] = useState('');

    const [modalSuperShow, setModalSuperShow] = useState(false);
    
    // Usando useNavigate para redirecionar após o login
    const navigate = useNavigate();

    // Função para validar o e-mail
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

    // Função para lidar com o login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/administradores/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Recebe a resposta como JSON
                const errorMessage = errorData.message || 'Erro ao fazer login. Verifique suas credenciais.'; // Extraímos a mensagem de erro
                setLoginError(errorMessage); // Define a mensagem de erro
                setLoginSuccess('');
                toast.error(errorMessage); // Exibe a notificação de erro
                return;
            }

            const data = await response.json();
            setLoginSuccess('Login realizado com sucesso!');
            setLoginError('');
            console.log('Login bem-sucedido:', data);

            // Exibe notificação de sucesso e redireciona para /homeAdministrador
            toast.success('Login realizado com sucesso!');
            navigate('/homeAdministrador'); // Redireciona para a página de administrador

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setLoginError('Erro ao conectar ao servidor.');
            setLoginSuccess('');
            toast.error('Erro ao conectar ao servidor.'); // Exibe notificação de erro
        }
    };

    return (
        <div className="container-login my-4  LoginAdmistrador">
            <div className="login-box shadow  rounded">
                <div className="row  p-2">
                    <img src={logoFoto} alt="logotipo da bi turbo" style={{width: "220px", height:"100px"}} className='d-block mx-auto'/>
                    <h5 className="text-center my-2">Acesso para Administrador</h5>

                    <div className="col-11  col-md-9 col-lg-10 mx-auto">
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

                            <Form.Group controlId="formBasicSenha" className="mt-3">
                                <Form.Label>Senha</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="ms-2"
                                    >
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </Button>
                                </div>
                            </Form.Group>

                            {loginError && <div className="text-danger mt-2">{loginError}</div>} {/* Exibe a mensagem de erro formatada */}
                            {loginSuccess && <div className="text-success mt-2">{loginSuccess}</div>}

                            <Button variant="primary" type="submit" className="links-acessos mt-3 px-5 mx-auto d-block">
                                Entrar
                            </Button>
                        </Form>

                        <hr />
                        <p className="text-center">
                            <strong className="melhorarStron">Esqueceste a sua senha?</strong>
                        </p>
                        <hr />

                        <p className="text-center">
                            <strong className="melhorarStrong text-danger" onClick={() => setModalSuperShow(true)}>Super Administrador <RiAdminFill fontSize={25} /></strong>
                        </p>

                        <ModalAcessoSuperAdmin
                            show={modalSuperShow}
                            onHide={() => setModalSuperShow(false)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
