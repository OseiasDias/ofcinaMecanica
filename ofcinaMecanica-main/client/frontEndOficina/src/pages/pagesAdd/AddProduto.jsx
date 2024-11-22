import "../../css/StylesAdmin/homeAdministrador.css";
import SideBar from "../../components/compenentesAdmin/SideBar";
import TopoAdmin from "../../components/compenentesAdmin/TopoAdmin";
import { IoIosAdd } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';



function FormularioProduto() {
  const [produto, setProduto] = useState({
    numeroProduto: 'PR286549',
    dataCompra: '2024-11-22',
    nome: '',
    galho: '1',
    fabricante: '',
    preco: '',
    unidadeMedida: '',
    fornecedor: '',
    cor: '',
    garantia: '',
    imagem: null,
    notas: [
      {
        textoNota: '',
        arquivosNota: [],
        interna: false,
        compartilhada: false,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduto({ ...produto, imagem: e.target.files[0] });
  };

  const handleNotaChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newNotas = [...produto.notas];
    newNotas[index][name] = type === 'checkbox' ? checked : value;
    setProduto({ ...produto, notas: newNotas });
  };

  const handleFileChange = (index, e) => {
    const newNotas = [...produto.notas];
    newNotas[index].arquivosNota = e.target.files;
    setProduto({ ...produto, notas: newNotas });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(produto);
  };

  return (

    <>
    <Form id="produtoForm" method="post" onSubmit={handleSubmit} encType="multipart/form-data">
      <Row>
        {/* Número do Produto */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="numeroProduto">
            <Form.Label>Número de Produto *</Form.Label>
            <Form.Control
              type="text"
              name="numeroProduto"
              value={produto.numeroProduto}
              onChange={handleChange}
              readOnly
            />
          </Form.Group>
        </Col>

        {/* Data de Compra */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="dataCompra">
            <Form.Label>Data de Compra *</Form.Label>
            <Form.Control
              type="date"
              name="dataCompra"
              value={produto.dataCompra}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Nome */}
      <Row>
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="nome">
            <Form.Label>Nome *</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={produto.nome}
              onChange={handleChange}
              placeholder="Digite o nome do produto"
              maxLength="30"
              required
            />
          </Form.Group>
        </Col>

        {/* Galho */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="galho">
            <Form.Label>Galho *</Form.Label>
            <Form.Control
              as="select"
              name="galho"
              value={produto.galho}
              onChange={handleChange}
            >
              <option value="1">Galho Principal</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {/* Fabricante */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="fabricante">
            <Form.Label>Nome do Fabricante *</Form.Label>
            <Form.Control
              as="select"
              name="fabricante"
              value={produto.fabricante}
              onChange={handleChange}
            >
              <option value="">--Selecione o nome da fabricação--</option>
              <option value="1">Filips</option>
              <option value="2">Alemanha</option>
            </Form.Control>
            <button>Adicionar/remover</button>
          </Form.Group>
        </Col>

        {/* Preço */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="preco">
            <Form.Label>Preço ($) *</Form.Label>
            <Form.Control
              type="text"
              name="preco"
              value={produto.preco}
              onChange={handleChange}
              placeholder="Digite o preço do produto"
              maxLength="10"
              required
            />
          </Form.Group>

        </Col>
      </Row>

      <Row>
        {/* Unidade de Medida */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="unidadeMedida">
            <Form.Label>Unidade de Medida *</Form.Label>
            <Form.Control
              as="select"
              name="unidadeMedida"
              value={produto.unidadeMedida}
              onChange={handleChange}
            >
              <option value="">- Selecionar Unidade -</option>
              <option value="1">Dúzia</option>
              <option value="2">Litro</option>
            </Form.Control>
            <button>Adicionar/remover</button>
          </Form.Group>
        </Col>

        {/* Fornecedor */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="fornecedor">
            <Form.Label>Fornecedor *</Form.Label>
            <Form.Control
              as="select"
              name="fornecedor"
              value={produto.fornecedor}
              onChange={handleChange}
            >
              <option value="">- Selecione Fornecedor -</option>
              <option value="56">Gondoafrica</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        {/* Cor */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="cor">
            <Form.Label>Cor</Form.Label>
            <div className="color-options">
              {/* Cores */}
              {['#080808', '#faf9f9', '#0f0ff0', '#d4d4d8', '#f70202', '#a70606', '#2e1905', '#156f38', '#610a0a'].map(color => (
                <div
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                    marginRight: "10px",
                    display: "inline-block",
                  }}
                  onClick={() => setProduto({ ...produto, cor: color })}
                />
              ))}
            </div>
            <button>Adicionar/remover</button>
          </Form.Group>
        </Col>

        {/* Garantia */}
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="garantia">
            <Form.Label>Garantia</Form.Label>
            <Form.Control
              type="text"
              name="garantia"
              value={produto.garantia}
              onChange={handleChange}
              placeholder="Insira a garantia do produto"
              maxLength="20"
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Imagem */}
      <Row>
        <Col xs={12} md={6} lg={6}>
          <Form.Group controlId="imagem">
            <Form.Label>Imagem</Form.Label>
            <Form.Control
              type="file"
              name="imagem"
              onChange={handleImageChange}
            />
            {produto.imagem && (
              <img
                src={URL.createObjectURL(produto.imagem)}
                alt="Imagem do produto"
                style={{ width: 100, marginTop: '10px' }}
              />
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Notas */}
      <Form.Group>
        <h6 className="mt-5">Adicionar Notas</h6>
        <hr />

        {produto.notas.map((nota, index) => (
          <div key={index} className="nota">
            <Row>
              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId={`nota-texto-${index}`}>
                  <Form.Label>Notas</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="textoNota"
                    value={nota.textoNota}
                    onChange={(e) => handleNotaChange(index, e)}
                    maxLength="100"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId={`nota-arquivos-${index}`}>
                  <Form.Label>Arquivos</Form.Label>
                  <Form.Control
                    type="file"
                    name={`nota-arquivos-${index}`}
                    onChange={(e) => handleFileChange(index, e)}
                    multiple
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={4} className="pt-4">
                <Form.Check
                  type="checkbox"
                  label="Nota Interna"
                  name="interna"
                  checked={nota.interna}
                  onChange={(e) => handleNotaChange(index, e)}
                />

                <Form.Check
                  type="checkbox"
                  label="Compartilhado com fornecedor"
                  name="compartilhada"
                  checked={nota.compartilhada}
                  onChange={(e) => handleNotaChange(index, e)}
                />
              </Col>
            </Row>
            <Button
              variant="danger"
              type="button"
              onClick={() => {
                const newNotas = produto.notas.filter((_, i) => i !== index);
                setProduto({ ...produto, notas: newNotas });
              }}
            >
              Remover Nota
            </Button>
          </div>
        ))}

      </Form.Group>

      {/* Botão de Enviar */}
      <Button variant="success" type="submit">
        Enviar
      </Button>
    </Form>


    {/* Modal de Confirmação */ }

  </>
  );
}








const AddProdutos = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <SideBar />

          <div className="flexAuto w-100 ">
            <TopoAdmin entrada="AddProdutos" direccao="/AddProdutos" leftSeta={<FaArrowLeftLong />} icone={<IoIosAdd />} leftR="/produtosPage" />

            <div className="vh-100 alturaPereita">
              <FormularioProduto />
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

export default AddProdutos;
