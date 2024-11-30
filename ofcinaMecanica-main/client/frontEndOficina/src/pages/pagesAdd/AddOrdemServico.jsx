import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar.jsx";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RiAddLargeFill } from 'react-icons/ri';
import "../../css/StylesAdmin/homeAdministrador.css";
import { Form, Row, Col } from "react-bootstrap";
import { FaCar } from "react-icons/fa";
import { FormularioCliente } from "./AddClientes.jsx";
import { FormularioVeiculo } from "./AddVeiculos.jsx";
import { MdDeleteForever } from "react-icons/md";




const ServiceAddForm = () => {
  const [notes, setNotes] = useState([{ id: 1, text: "", file: null, internal: false, shared: false }]);

  // Função para adicionar uma nova nota
  const addNote = () => {
    setNotes([...notes, { id: notes.length + 1, text: "", file: null, internal: false, shared: false }]);
  };

  // Função para remover uma nota
  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Função para lidar com mudanças nos campos de nota
  const handleNoteChange = (id, field, value) => {
    setNotes(notes.map((note) => note.id === id ? { ...note, [field]: value } : note));
  };

  // Estado para controlar a visibilidade das taxas
  const [washBayChecked, setWashBayChecked] = useState(false);
  const [motTestChecked, setMotTestChecked] = useState(false);

  // Funções para lidar com as mudanças nas checkboxes
  const handleWashBayChange = (e) => {
    setWashBayChecked(e.target.checked);
  };

  const handleMotTestChange = (e) => {
    setMotTestChecked(e.target.checked);
  };


  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Função para abrir a modal com conteúdo específico
  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  // Função para fechar a modal
  const handleCloseModal = () => {
    setShowModal(false);
  };


  const [showCorModal, setShowCorModal] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState({ nome: '' });
  const [categorias, setCategorias] = useState([]);

  // Função para abrir a modal
  const handleShowCorModal = () => setShowCorModal(true);

  // Função para fechar a modal
  const handleCloseCorModal = () => setShowCorModal(false);

  // Função para tratar a mudança no campo de nome da categoria
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaCategoria({ ...novaCategoria, [name]: value });
  };

  // Função para adicionar uma nova categoria
  const handleAddCategoria = () => {
    if (novaCategoria.nome) {
      setCategorias([...categorias, novaCategoria]);
      setNovaCategoria({ nome: '' }); // Limpar o campo após adicionar
    }
  };

  // Função para remover uma categoria
  const handleRemoveCategoria = (nome) => {
    setCategorias(categorias.filter((categoria) => categoria.nome !== nome));
  };






  return (
    <div className="row">
      <div className="col-md-12 col-xs-12">
        <div className="panel panel-default">

          <div className="col-md-12 mt-5">
            <h6>PASSO - 1: ADICIONAR DETALHES DO SERVIÇO...</h6>
            <hr />
          </div>
          <Form id="ServiceAdd-Form" method="post" action="/garage/service/store" encType="multipart/form-data">
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="jobno">
                  <Form.Label>Número do cartão de trabalho <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" value="J000005" readOnly />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="cust_id">
                  <Form.Label>Nome do cliente <span className="text-danger">*</span></Form.Label>
                  <div className="d-flex">
                    <div className="input-group">
                      <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>

                      <Form.Control as="select" required>
                        <option value="">Selecione o Cliente</option>
                        <option value="6">Abraão Odair Kanepa</option>
                      </Form.Control>
                    </div>
                    <Button
                      className="links-acessos px-2 border-radius-zero"
                      onClick={() => handleOpenModal('cliente')}  // Passa o conteúdo específico para a modal
                    >
                      <RiAddLargeFill />
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="vhi">
                  <Form.Label>Nome do veículo <span className="text-danger">*</span></Form.Label>
                  <div className="d-flex">
                    <div className="input-group">
                      <span className="input-group-text"><FaCar fontSize={20} color="#0070fa" /></span>

                      <Form.Control as="select" required>
                        <option value="">Selecione o nome do veículo</option>
                      </Form.Control>
                    </div>
                    <Button
                      className="links-acessos px-2 border-radius-zero"
                      onClick={() => handleOpenModal('veiculo')}  // Passa o conteúdo específico para a modal
                    >
                      <RiAddLargeFill />
                    </Button>
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="p_date">
                  <Form.Label>Encontro <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="date"
                    defaultValue="2024-11-27T21:21:28"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="repair_cat">
                  <Form.Label>Categoria de reparo <span className="text-danger">*</span></Form.Label>
                  <div className="d-flex">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaCar fontSize={20} color="#0070fa" />
                      </span>
                      <Form.Control as="select" required>
                        <option value="">- Selecione categoria de reparo -</option>
                        <option value="breakdown">Breakdown</option>
                        <option value="booked vehicle">Booked Vehicle</option>
                        <option value="repeat job">Repeat Job</option>
                        <option value="customer waiting">Customer Waiting</option>
                      </Form.Control>
                    </div>
                    <Button
                      className="links-acessos px-2 border-radius-zero"
                      onClick={handleShowCorModal}  // Abre a modal ao clicar no botão
                    >
                      <RiAddLargeFill />
                    </Button>
                  </div>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="AssigneTo">
                  <Form.Label>Atribuir a <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" required>
                    <option value="">-- Selecione Atribuir a --</option>
                    <option value="2">Julia Jeremias</option>
                    <option value="4">Silvana Alfredo</option>
                    <option value="5">Augusto Da Silva</option>
                    <option value="10">Firmino Yundula Kiala João</option>
                    <option value="11">Paulo Pedro Bassunga</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="service_type">
                  <Form.Label>Tipo de serviço <span className="text-danger">*</span></Form.Label>
                  <Form.Check
                    type="radio"
                    label="Pago"
                    name="service_type"
                    value="paid"
                    checked
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="charge_required">
                  <Form.Label>Taxa de serviço (kz) <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="charge"
                    placeholder="Insira a taxa de serviço"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="branch">
                  <Form.Label>Galho <span className="text-danger">*</span></Form.Label>
                  <Form.Control as="select" required>
                    <option value="1">Main Branch</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="details">
                  <Form.Label>Detalhes</Form.Label>
                  <Form.Control as="textarea" name="details" maxLength="100" />
                </Form.Group>
              </Col>
            </Row>

            <h6>DETALHES ADCIONAS</h6>
            <hr />
            <Row className="mb-3 d-flex">
              <Col xs={12} md={6}>
                <Form.Group controlId="washBay" className="d-flex  bordando">
                  <Form.Label className="me-3">Lavagem</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="washbay"
                    checked={washBayChecked}
                    onChange={handleWashBayChange}
                    style={{ height: "20px", width: "20px", marginRight: "5px" }}
                  />

                </Form.Group>
              </Col>

              {/* Carga da baía de lavagem */}
              {washBayChecked && (
                <Col xs={12} md={6}>
                  <Form.Group controlId="washBayCharge">
                    <Form.Label>Preço de lavagem (kz)</Form.Label>
                    <Form.Control
                      type="text"
                      name="washBayCharge"
                      placeholder="Insira as preço de lavagem"
                      maxLength="10"
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>

            {/* Teste MOT */}
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="motTestStatusCheckbox" className="d-flex  bordando">
                  <Form.Label className="me-2">Teste MOT</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="motTestStatusCheckbox"
                    checked={motTestChecked}
                    onChange={handleMotTestChange}
                    style={{ height: "20px", width: "20px", marginRight: "5px" }}
                  />

                </Form.Group>
              </Col>

              {/* Taxa de teste MOT */}
              {motTestChecked && (
                <Col xs={12} md={6}>
                  <Form.Group controlId="motTestCharge">
                    <Form.Label>Preço de teste MOT (kz)</Form.Label>
                    <Form.Control
                      type="text"
                      name="motTestCharge"
                      placeholder="Insira as preço de teste MOT"
                      maxLength="10"
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
            <hr />
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="images">
                  <Form.Label>Selecione várias imagens</Form.Label>
                  <Form.Control
                    type="file"
                    name="image[]"
                    multiple
                    data-max-file-size="5M"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="title">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Digite o título"
                    maxLength="50"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="note-row">
              <Row className="mb-3">
                <Col xs={12}>
                  <h5>Adcionar Notas</h5>
                  <hr />
                  {notes.map((note, index) => (
                    <Row key={note.id} className="align-items-center mb-2">
                      <Col xs={12} md={5}>
                        <Form.Control
                          as="textarea"
                          value={note.text}
                          onChange={(e) =>
                            handleNoteChange(note.id, "text", e.target.value)
                          }
                          placeholder="Escreva uma nota"
                        />
                      </Col>
                      <Col xs={6} md={3}>
                        <Form.Control
                          type="file"
                          onChange={(e) =>
                            handleNoteChange(note.id, "file", e.target.files[0])
                          }
                        />
                      </Col>

                      <Col xs={6} md={2}>
                        <Form.Check
                          type="checkbox"
                          checked={note.internal}
                          label="Notas Interno"
                          onChange={(e) =>
                            handleNoteChange(note.id, "internal", e.target.checked)
                          }
                        />
                      </Col>

                      <Col xs={6} md={2}>
                        <Form.Check
                          type="checkbox"
                          checked={note.shared}
                          label="Notas Compartilhado"
                          onChange={(e) =>
                            handleNoteChange(note.id, "shared", e.target.checked)
                          }
                        />
                      </Col>

                      <Col xs={12}>
                        <Button
                          variant="danger"
                          onClick={() => removeNote(note.id)}
                          size="sm"
                          className="mt-2"
                        >
                          Remover Nota
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="success" onClick={addNote} className="mt-3">
                    Adicionar Nota
                  </Button>
                </Col>
              </Row>
            </div>

            <Row>
              <Col xs={12} className="text-center">
                <Button variant="primary" type="submit" size="lg">
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Modal */}
          <Modal show={showModal} onHide={handleCloseModal} centered size="xl" scrollable >
            <Modal.Header closeButton>
              <Modal.Title>Adicionar {modalContent === 'cliente' ? 'Cliente' : 'Veículo'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Aqui você pode renderizar conteúdo dinâmico dependendo do tipo de modal */}
              {modalContent === 'cliente' && (
                <div className="topifincando">
                  <FormularioCliente />
                </div>
              )}
              {modalContent === 'veiculo' && (
                <div className="topifincando">
                  <FormularioVeiculo />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
              </Button>

            </Modal.Footer>
          </Modal>
          <Modal show={showCorModal} onHide={handleCloseCorModal} scrollable centered>
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Categoria de Reparo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Nome da categoria */}
                <div className="d-flex mb-3">
                  <Form.Group controlId="novaCategoriaNome" className="w-100">
                    <Form.Label>Nome da Categoria</Form.Label>
                    <div className="d-flex">
                    <Form.Control
                      type="text"
                      name="nome"
                      value={novaCategoria.nome}
                      onChange={handleChange}
                      placeholder="Digite o nome da categoria"
                    />
                    <Button variant="primary" onClick={handleAddCategoria} className="btnAddCor links-acessos">
                      Adicionar
                    </Button>
                    </div>
                  </Form.Group>
                </div>

                

              </Form>

              {/* Lista de categorias atuais */}
              <hr />
              <h6>Categorias Atuais</h6>
              <ul className="list-group">
                {categorias.map((categoria) => (
                  <li
                    key={categoria.codigo}
                    className="p-3 border linhaRem d-flex justify-content-between align-items-center"
                  >
                    {/* Nome e código da categoria */}
                    <span>{categoria.nome} - {categoria.codigo}</span>

                    {/* Ícone para remover a categoria */}
                    <MdDeleteForever
                      className="text-danger"
                      fontSize={20}
                      onClick={() => handleRemoveCategoria(categoria.codigo)}
                      style={{ cursor: 'pointer' }}
                    />
                  </li>
                ))}
              </ul>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div >
  );
};









const AddFuncionarios = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />
          <div className="flexAuto w-100">
            <TopoAdmin entrada="Adicionar Ordem de Serviço" leftSeta={<FaArrowLeftLong />} leftR="/funcionariosList" />
            <div className="vh-100 alturaPereita">
              <ServiceAddForm />
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
