const express = require('express');
const ControllerEmpresaContatos = require('../controllers/ControllerEmpresaContatos');

const router = express.Router();

// Rota para criar um novo contato
router.post('/', ControllerEmpresaContatos.criarContato);

// Rota para obter todos os contatos
router.get('/', ControllerEmpresaContatos.obterContatos);

// Rota para obter um contato pelo ID
router.get('/:id', ControllerEmpresaContatos.obterContatoPorId);

// Rota para obter todos os contatos de uma empresa
router.get('/empresa/:empresa_id', ControllerEmpresaContatos.obterContatosPorEmpresaId);

// Rota para atualizar um contato
router.put('/:id', ControllerEmpresaContatos.atualizarContato);

// Rota para deletar um contato
router.delete('/:id', ControllerEmpresaContatos.deletarContato);

module.exports = router;
