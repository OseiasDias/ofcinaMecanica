const express = require('express');
const ControllerUsuario = require('../controllers/ControllerUsuario');

const router = express.Router();

// Rota para criar um novo usuário
router.post('/', ControllerUsuario.criarUsuario);

// Rota para obter todos os usuários
router.get('/', ControllerUsuario.obterUsuarios);

// Rota para obter um usuário por ID
router.get('/:id_usuario', ControllerUsuario.obterUsuarioPorId);

// Rota para atualizar o status de um cliente
router.put('/:id_usuario/status', ControllerUsuario.atualizarStatus);


// Rota para atualizar um usuário
router.put('/:id_usuario', ControllerUsuario.atualizarUsuario);

// Rota para deletar um usuário
router.delete('/:id_usuario', ControllerUsuario.deletarUsuario);

// Rota para obter um usuário por email (para login)
router.get('/email/:email', ControllerUsuario.obterUsuarioPorEmail);

module.exports = router;
