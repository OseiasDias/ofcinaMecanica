import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { Form, Button, Row, Col, Modal, InputGroup } from 'react-bootstrap';

const FormularioFuncionario = () => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: '',
    sobrenome: '',
    genero: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    celular: '',
    filial: '1',
    dataAdmissao: '2024-11-25',
    cargo: '',
    dataSaida: '',
    dataNascimento: '',
    nomeExibicao: '',
    telefoneFixo: '',
    pais: '',
    estado: '',
    cidade: '',
    endereco: '',
    imagem: null,
  });

  const handleAlteracao = (e) => {
    const { name, value } = e.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const handleAlteracaoImagem = (e) => {
    setDadosFormulario({ ...dadosFormulario, imagem: e.target.files[0] });
  };

  const handleEnvio = (e) => {
    e.preventDefault();
    console.log(dadosFormulario);
  };

  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoCargo, setNovoCargo] = useState('');
  const [cargos, setCargos] = useState([
    'Gerente',
    'Assistente',
    'Analista',
    'Desenvolvedor',
    'Coordenador',
  ]);

  const handleAlteracaoNovoCargo = (e) => {
    setNovoCargo(e.target.value);
  };

  const handleAdicionarCargo = () => {
    if (novoCargo) {
      setCargos([...cargos, novoCargo]);
      setNovoCargo('');
      setMostrarModal(false);
    } else {
      alert("Por favor, insira um nome para o cargo.");
    }
  };

  return (
    <Form
      id="formulario_adicionar_funcionario"
      method="post"
      action="https://biturbomotors.com/garage/employee/store"
      encType="multipart/form-data"
      className="form-horizontal upperform employeeAddForm"
      onSubmit={handleEnvio}
    >
      {/* Dados Pessoais */}
      <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 col-xs-12 space">
        <h6>DADOS PESSOAIS</h6>
        <hr />
      </div>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="nome">
            <Form.Label>Primeiro nome <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={dadosFormulario.nome}
              placeholder="Introduza o primeiro nome"
              maxLength="50"
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="sobrenome">
            <Form.Label>Último nome <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="sobrenome"
              value={dadosFormulario.sobrenome}
              placeholder="Insira o último nome"
              maxLength="50"
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="genero">
            <Form.Label>Gênero</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Masculino"
                name="genero"
                value="0"
                checked={dadosFormulario.genero === '0'}
                onChange={handleAlteracao}
              />
              <Form.Check
                type="radio"
                label="Feminino"
                name="genero"
                value="1"
                checked={dadosFormulario.genero === '1'}
                onChange={handleAlteracao}
              />
            </div>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="email">
            <Form.Label>E-mail <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={dadosFormulario.email}
              placeholder="Digite o e-mail"
              maxLength="50"
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Informações de Contato */}
      <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 col-xs-12 space">
        <h6>INFORMAÇÕES DE CONTATO</h6>
        <hr />
      </div>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="celular">
            <Form.Label>Número do celular <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={dadosFormulario.celular}
              placeholder="Digite o número de celular"
              maxLength="16"
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="telefoneFixo">
            <Form.Label>Número do telefone fixo</Form.Label>
            <Form.Control
              type="text"
              name="telefoneFixo"
              value={dadosFormulario.telefoneFixo}
              placeholder="Digite o telefone fixo"
              maxLength="16"
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Informações Profissionais */}
      <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-sm-12 col-xs-12 space">
        <h6>INFORMAÇÕES PROFISSIONAIS</h6>
        <hr />
      </div>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="filial">
            <Form.Label>Filial <span className="text-danger">*</span></Form.Label>
            <Form.Control
              as="select"
              name="filial"
              value={dadosFormulario.filial}
              onChange={handleAlteracao}
            >
              <option value="1">Filial Principal</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="cargo">
            <Form.Label>Cargo <span className="text-danger">*</span></Form.Label>
            <InputGroup>
              <Form.Control
                as="select"
                name="cargo"
                value={dadosFormulario.cargo}
                onChange={handleAlteracao}
              >
                <option value="">Selecione o cargo</option>
                {cargos.map((cargo, index) => (
                  <option key={index} value={cargo}>
                    {cargo}
                  </option>
                ))}
              </Form.Control>
              <Button variant="outline-secondary" onClick={() => setMostrarModal(true)}>
                Adicionar
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      {/* Restante do Formulário */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="dataAdmissao">
            <Form.Label>Data de Admissão <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              name="dataAdmissao"
              value={dadosFormulario.dataAdmissao}
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="dataSaida">
            <Form.Label>Data de Saída</Form.Label>
            <Form.Control
              type="date"
              name="dataSaida"
              value={dadosFormulario.dataSaida}
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="dataNascimento">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="date"
              name="dataNascimento"
              value={dadosFormulario.dataNascimento}
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="nomeExibicao">
            <Form.Label>Nome Exibido</Form.Label>
            <Form.Control
              type="text"
              name="nomeExibicao"
              value={dadosFormulario.nomeExibicao}
              placeholder="Nome que será exibido"
              maxLength="25"
              onChange={handleAlteracao}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="imagem">
            <Form.Label>Imagem</Form.Label>
            <Form.Control
              type="file"
              name="imagem"
              onChange={handleAlteracaoImagem}
            />
            <img src={dadosFormulario.imagem ? URL.createObjectURL(dadosFormulario.imagem) : "https://biturbomotors.com/garage/public/employee/avtar.png"} alt="Pré-visualização" className="mt-2" style={{ width: '52px' }} />
          </Form.Group>
        </Col>
      </Row>

      {/* Modal para adicionar cargo */}
      <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Cargo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="novoCargo">
            <Form.Label>Nome do Cargo</Form.Label>
            <Form.Control
              type="text"
              value={novoCargo}
              onChange={handleAlteracaoNovoCargo}
              placeholder="Digite o nome do cargo"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAdicionarCargo}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>

      <Button type="submit" variant="success" className="botaoSubmitFuncionario">
        ENVIAR
      </Button>
    </Form>
  );
};

const AddFuncionarios = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Adicionar Funcionarios" leftSeta={<FaArrowLeftLong />} leftR="/funcionariosList" />
            <div className="vh-100 alturaPereita">
              <FormularioFuncionario />
            </div>
            <div className="div text-center np pt-2 mt-2 ppAr">
              <hr />
              <p className="text-center">
                Copyright © 2024 <b>Bi-tubo Moters</b>, Ltd. Todos os direitos
                reservados.
                <br />
                Desenvolvido por: <b>Oseias Dias</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFuncionarios;
