const express = require('express');
const ControllerAgendamento = require('../controllers/ControllerAgendamento'); // Importa o controller de Agendamento

const router = express.Router();

// Rota para criar um novo agendamento
router.post('/', ControllerAgendamento.criarAgendamento);

// Rota para obter todos os agendamentos
router.get('/', ControllerAgendamento.obterAgendamentos);

// Rota para obter um agendamento por ID
router.get('/:id_agendamento', ControllerAgendamento.obterAgendamentoPorId);

// Rota para atualizar um agendamento
router.put('/:id_agendamento', ControllerAgendamento.atualizarAgendamento);

// Rota para deletar um agendamento
router.delete('/:id_agendamento', ControllerAgendamento.deletarAgendamento);

module.exports = router;
