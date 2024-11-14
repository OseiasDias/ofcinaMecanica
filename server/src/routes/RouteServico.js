const express = require('express');
const router = express.Router();
const ControllerServico = require('../controllers/ControllerServico'); // Importa o controller de Serviço

// Rota para criar um novo serviço
router.post('/', ControllerServico.criarServico);

// Rota para obter todos os serviços
router.get('/', ControllerServico.obterServicos);

// Rota para obter um serviço por ID
router.get('/:id_servico', ControllerServico.obterServicoPorId);

// Rota para atualizar um serviço
router.put('/:id_servico', ControllerServico.atualizarServico);

// Rota para deletar um serviço
router.delete('/:id_servico', ControllerServico.deletarServico);

router.get('/servico/total', ControllerServico.contarServicos);


module.exports = router; // Exporta as rotas
