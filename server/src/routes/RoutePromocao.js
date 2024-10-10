const express = require('express');

const ControllerPromocao = require('../controllers/ControllerPromocao');

const router = express.Router();

// Rota para criar um novo promoção
router.post('/', ControllerPromocao.criarPromocao);

// Rota para obter todas as promoções
router.get('/', ControllerPromocao.obterPromocoes);

// Rota para obter uma promoção por ID
router.get('/:id_promocao', ControllerPromocao.obterPromocaoPorId);

// Rota para atualizar uma promoção
router.put('/:id_promocao', ControllerPromocao.atualizarPromocao);

// Rota para deletar uma promoção
router.delete('/:id_promocao', ControllerPromocao.deletarPromocao);

module.exports = router;
