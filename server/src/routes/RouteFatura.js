const express = require('express');
const ControllerFatura = require('../controllers/ControllerFatura');

const router = express.Router();

// Rota para criar uma nova fatura
router.post('/', ControllerFatura.criarFatura);

// Rota para obter todas as faturas
router.get('/', ControllerFatura.obterFaturas);

// Rota para obter uma fatura por ID
router.get('/:id_fatura', ControllerFatura.obterFaturaPorId);

// Rota para atualizar uma fatura
router.put('/:id_fatura', ControllerFatura.atualizarFatura);

// Rota para deletar uma fatura
router.delete('/:id_fatura', ControllerFatura.deletarFatura);

// Rota para obter faturas por status de pagamento (Pendente ou Pago)
router.get('/status/:status_pagamento', ControllerFatura.obterFaturasPorStatus);

module.exports = router;
