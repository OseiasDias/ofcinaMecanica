// routes/RouteAdministrador.js
const express = require('express');
const ControllerAdministrador = require('../controllers/ControllerAdministrador');

const router = express.Router();

// Rota para criar um novo administrador
router.post('/', ControllerAdministrador.criarAdministrador);

// Rota para obter todos os administradores
router.get('/', ControllerAdministrador.obterAdministradores);
 
// Rota para obter um administrador por ID
router.get('/:id_administrador', ControllerAdministrador.obterAdministradorPorId);

// Rota para atualizar um administrador
router.put('/:id_administrador', ControllerAdministrador.atualizarAdministrador);

// Rota para deletar um administrador
router.delete('/:id_administrador', ControllerAdministrador.deletarAdministrador);

// Rota para atualizar o status de um cliente
router.put('/:id_administrador/status', ControllerAdministrador.atualizarStatus);

// Rota para fazer login de administrador
router.post('/login', ControllerAdministrador.login);

router.get('/email/:email', ControllerAdministrador.obterAdministradorPorEmail);


module.exports = router;
