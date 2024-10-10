const express = require('express');
const ControllerPagamento = require('../controllers/ControllerPagamento'); // Importa o controller de Pagamento

const router = express.Router();

// Rota para criar um novo pagamento
router.post('/', ControllerPagamento.criarPagamento);

// Rota para obter todos os pagamentos
router.get('/', ControllerPagamento.obterPagamentos);

// Rota para obter um pagamento por ID
router.get('/:id_pagamento', ControllerPagamento.obterPagamentoPorId);

// Rota para atualizar um pagamento
router.put('/:id_pagamento', ControllerPagamento.atualizarPagamento);

// Rota para deletar um pagamento
router.delete('/:id_pagamento', ControllerPagamento.deletarPagamento);

module.exports = router;
