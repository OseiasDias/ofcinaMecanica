const express = require('express');
const ControllerVeiculo = require('../controllers/ControllerVeiculo');

const router = express.Router();

// Rota para criar um novo veículo
router.post('/', ControllerVeiculo.criarVeiculo);

// Rota para obter todos os veículos
router.get('/', ControllerVeiculo.obterVeiculos);

// Rota para obter um veículo por ID
router.get('/:id_veiculo', ControllerVeiculo.obterVeiculoPorId);

// Rota para atualizar um veículo
router.put('/:id_veiculo', ControllerVeiculo.atualizarVeiculo);

// Rota para deletar um veículo
router.delete('/:id_veiculo', ControllerVeiculo.deletarVeiculo);

module.exports = router;
