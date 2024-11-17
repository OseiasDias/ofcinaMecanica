const express = require('express');
const ControllerHorarios = require('../controllers/ControllerHorarios'); // Importa o controller de Horarios

const router = express.Router();

// Rota para criar um novo horário
router.post('/', ControllerHorarios.criarHorario);

// Rota para obter todos os horários
router.get('/', ControllerHorarios.obterHorarios);

// Rota para obter os horários de uma empresa por dia
router.get('/:empresa_id/:dia', ControllerHorarios.obterHorariosPorEmpresaDia);

// Rota para atualizar um horário
router.put('/:id', ControllerHorarios.atualizarHorario);

// Rota para deletar um horário
router.delete('/:id', ControllerHorarios.deletarHorario);

// Rota para contar todos os horários
router.get('/total', ControllerHorarios.contarHorarios);

module.exports = router;
