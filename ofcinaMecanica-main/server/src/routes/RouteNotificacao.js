const express = require('express');
const ControllerNotificacao = require('../controllers/ControllerNotificacao'); // Importa o controller de Notificação

const router = express.Router();

// Rota para criar uma nova notificação
router.post('/', ControllerNotificacao.criarNotificacao);

// Rota para obter todas as notificações
router.get('/', ControllerNotificacao.obterNotificacoes);

// Rota para obter uma notificação por ID
router.get('/:id_notificacao', ControllerNotificacao.obterNotificacaoPorId);

// Rota para atualizar uma notificação
router.put('/:id_notificacao', ControllerNotificacao.atualizarNotificacao);

// Rota para deletar uma notificação
router.delete('/:id_notificacao', ControllerNotificacao.deletarNotificacao);

module.exports = router;
