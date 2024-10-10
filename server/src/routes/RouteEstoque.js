const express = require('express');
const ControllerEstoque = require('../controllers/ControllerEstoque'); // Importa o controller de Estoque

const router = express.Router();

// Rota para criar um novo item no estoque
router.post('/', ControllerEstoque.criarItem);

// Rota para obter todos os itens do estoque
router.get('/', ControllerEstoque.obterItens);

// Rota para obter um item do estoque por ID
router.get('/:id_item', ControllerEstoque.obterItemPorId);

// Rota para atualizar um item no estoque
router.put('/:id_item', ControllerEstoque.atualizarItem);

// Rota para deletar um item do estoque
router.delete('/:id_item', ControllerEstoque.deletarItem);

module.exports = router;
