const express = require('express');
const ControllerFeedback = require('../controllers/ControllerFeedback'); // Importa o controller de Feedback

const router = express.Router();

// Rota para criar um novo feedback
router.post('/', ControllerFeedback.criarFeedback);

// Rota para obter todos os feedbacks
router.get('/', ControllerFeedback.obterFeedbacks);

// Rota para obter um feedback por ID
router.get('/:id_feedback', ControllerFeedback.obterFeedbackPorId);

// Rota para atualizar um feedback
router.put('/:id_feedback', ControllerFeedback.atualizarFeedback);

// Rota para deletar um feedback
router.delete('/:id_feedback', ControllerFeedback.deletarFeedback);

module.exports = router;
