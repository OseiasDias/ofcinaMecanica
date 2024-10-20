{/**import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs"; */}
import '../css/editarPerfilCliente.css';
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import fotoPerfil from '../assets/img/minha.jpg';


import { Tabs, Tab, Form, Button } from "react-bootstrap";


function EditarDados() {
    return (
        <>
            <>
            <Form>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label>Nome Completo</Form.Label>
                            <Form.Control type="text" defaultValue="Oseias Edgar Dias" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue="osedia@gmail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDataNascimento">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control type="date" defaultValue="2001-05-12" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGenero">
                            <Form.Label>Gênero</Form.Label>
                            <Form.Select>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTelefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="tel" defaultValue="938629915" />
                        </Form.Group>

                      

                        <Form.Group className="mb-3" controlId="formEndereco">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control type="text" defaultValue="Luanda-Viana" />
                        </Form.Group>

                        

                        <Button variant="primary" type="submit" className='d-block mx-auto links-acessos'>
                            Salvar Alterações
                        </Button>
                    </Form>
            </>

        </>
    )
}



function MudarSenha() {
  const [showPasswordAtual, setShowPasswordAtual] = useState(false);
  const [showPasswordNova, setShowPasswordNova] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <Form>
      {/* Campo para a senha atual */}
      <Form.Group className="mb-3" controlId="formSenhaAtual">
        <Form.Label>Senha Atual</Form.Label>
        <div className="d-flex">
          <Form.Control
            type={showPasswordAtual ? "text" : "password"}
            placeholder="Digite sua senha atual"
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPasswordAtual(!showPasswordAtual)}
            className="ms-2 transitionNone"
          >
            {showPasswordAtual ? <FaRegEye /> : <FaRegEyeSlash/>}
          </Button>
        </div>
      </Form.Group>

      {/* Campo para a nova senha */}
      <Form.Group className="mb-3" controlId="formNovaSenha">
        <Form.Label>Nova Senha</Form.Label>
        <div className="d-flex">
          <Form.Control
            type={showPasswordNova ? "text" : "password"}
            placeholder="Digite sua nova senha"
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPasswordNova(!showPasswordNova)}
            className="ms-2 transitionNone"
          >
            {showPasswordNova ? <FaRegEye /> : <FaRegEyeSlash/>}
          </Button>
        </div>
      </Form.Group>

      {/* Campo para confirmar a nova senha */}
      <Form.Group className="mb-3" controlId="formConfirmarSenha">
        <Form.Label>Confirmar Nova Senha</Form.Label>
        <div className="d-flex">
          <Form.Control
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="Confirme sua nova senha"
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="ms-2 transitionNone"
          >
            {showPasswordConfirm ? <FaRegEye /> : <FaRegEyeSlash/>}
          </Button>
        </div>
      </Form.Group>

      {/* Botão de salvar alterações */}
      <Button variant="primary" type="submit" className="d-block mx-auto links-acessos">
        Salvar Alterações
      </Button>
    </Form>
  );
}






function MostrarDados() {
    return (
        <>
            <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
                {/* Aba Visão Geral */}
                <Tab eventKey="home" title="Visão Geral">
                    <p className="d-flex justify-content-between belezaParagrafo">
                        <span><strong>Nome</strong></span>
                        <span>Oseias Edgar Dias</span>
                    </p>

                    <p className="d-flex justify-content-between belezaParagrafo">
                        <span><strong>Email</strong></span>
                        <span>osedia@gmail.com</span>
                    </p>
                    <p className="d-flex justify-content-between belezaParagrafo">
                        <span><strong>Telefone</strong></span>
                        <span>938629915</span>
                    </p>
                    <p className="d-flex justify-content-between belezaParagrafo">
                        <span><strong>Data Nascimento</strong></span>
                        <span>12-Maio-2001</span>
                    </p>
                    <p className="d-flex justify-content-between belezaParagrafo">
                        <span><strong>Endereço</strong></span>
                        <span>Luanda-Viana</span>
                    </p>
                    <p className="d-flex justify-content-between belezaParagrafo">
                        <span><strong>Genêro</strong></span>
                        <span>Masculino</span>
                    </p>
                </Tab>

                {/* Aba Editar Perfil */}
                <Tab eventKey="profile" title="Editar Perfil">
                   <EditarDados />
                </Tab>

                {/* Aba Mudar Senha */}
                <Tab eventKey="longer-tab" title="Mudar Senha">
                    <MudarSenha />
                </Tab>
            </Tabs>
        </>
    );
}


function EditarPerfilCliente() {
    return (
        <>
            <h1 className="opacity-0">Oseias dias</h1>

            <div className="container">
                <div className="row my-5 corpoTab">
                    <div className="col-12 col-lg-4 col-md-10  mx-auto">
                        <div className="espacamento">
                            <img src={fotoPerfil} alt="foto Perfil" className="w-100 fotoPerfil imgPerfil" />
                            <h3 className="text-center my-2">Oseias Dias</h3>
                            <h6 className="text-center">Cliente</h6>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8 col-md-10 mx-auto">
                        <div className="espacamento mb-5 pb-5">


                        <MostrarDados />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default EditarPerfilCliente;
