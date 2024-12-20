// routes/RouteCliente.js
const express = require('express');
const ControllerCliente = require('../controllers/ControllerCliente');

const router = express.Router();

// Rota para criar um novo cliente
router.post('/', ControllerCliente.criarCliente);

// Rota para obter todos os clientes
router.get('/', ControllerCliente.obterClientes);

// Rota para obter um cliente por ID
router.get('/:id_cliente', ControllerCliente.obterClientePorId);

// Rota para obter um cliente por email
router.get('/email/:email', ControllerCliente.obterClientePorEmail); // Adiciona a rota para buscar cliente por email



// Rota para atualizar o status de um cliente
router.put('/:id_cliente/status', ControllerCliente.atualizarStatus);

// Rota para atualizar um cliente
router.put('/:id_cliente', ControllerCliente.atualizarCliente);

// Rota para deletar um cliente
router.delete('/:id_cliente', ControllerCliente.deletarCliente);

// Rota para fazer login do cliente
router.post('/login', ControllerCliente.loginCliente); // Adiciona a rota de login

// Rota para obter o maior id_cliente
router.get('pegar/maior-id', ControllerCliente.obterMaiorId); // Adiciona a rota para obter o maior id_cliente

router.get('/clientes/total', ControllerCliente.contarClientes);



module.exports = router;
