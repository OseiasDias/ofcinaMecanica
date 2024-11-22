const express = require('express');
const ControllerEmpresa = require('../controllers/ControllerEmpresa');

const router = express.Router();

// Rota para criar uma nova empresa
router.post('/', ControllerEmpresa.criarEmpresa);

// Rota para obter todas as empresas
router.get('/', ControllerEmpresa.obterEmpresas);

// Rota para obter uma empresa por ID
router.get('/:id_empresa', ControllerEmpresa.obterEmpresaPorId);

// Rota para obter uma empresa por NIF
router.get('/nif/:nif_empresa', ControllerEmpresa.obterEmpresaPorNif); // Adiciona a rota para buscar empresa por NIF

// Rota para atualizar uma empresa
router.put('/:id_empresa', ControllerEmpresa.atualizarEmpresa);

// Rota para deletar uma empresa
router.delete('/:id_empresa', ControllerEmpresa.deletarEmpresa);

// Rota para obter o maior id_empresa
router.get('/pegar/maior-id', ControllerEmpresa.obterMaiorId); // Adiciona a rota para obter o maior id_empresa

module.exports = router;
