const express = require('express');
const CarroController = require('../controllers/ControllerCarro');

const router = express.Router();

// Rota para adicionar um carro
router.post('/', CarroController.adicionar);

// Rota para obter todos os carros
router.get('/', CarroController.obterTodos);

// Rota para obter um carro por ID
router.get('/:id_carro', CarroController.obterPorId);

// Rota para obter carros de um cliente pelo id_cliente
router.get('/cliente/:id_cliente', CarroController.obterCarrosPorCliente);

// Rota para atualizar um carro
router.put('/:id_carro', CarroController.atualizar);

// Rota para excluir um carro
router.delete('/:id_carro', CarroController.excluir);

module.exports = router;
