const Pagamento = require('../models/Pagamento'); // Importa o modelo de Pagamento

class ControllerPagamento {
    // Método para criar um novo pagamento
    static async criarPagamento(req, res) {
        try {
            const { id_agendamento, valor, metodo_pagamento, status } = req.body;

            // Valida os campos obrigatórios
            if (!id_agendamento || !valor || !metodo_pagamento || !status) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Cria um novo objeto de pagamento
            const novoPagamento = new Pagamento(null, id_agendamento, valor, metodo_pagamento, status);

            // Salva o pagamento no banco de dados
            const id_pagamento = await Pagamento.salvar(novoPagamento);

            return res.status(201).json({ message: 'Pagamento criado com sucesso.', id_pagamento });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar pagamento.', error: error.message });
        }
    }

    // Método para obter todos os pagamentos
    static async obterPagamentos(req, res) {
        try {
            const pagamentos = await Pagamento.obterTodos();
            return res.status(200).json(pagamentos);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao obter pagamentos.', error: error.message });
        }
    }

    // Método para obter um pagamento por ID
    static async obterPagamentoPorId(req, res) {
        try {
            const { id_pagamento } = req.params;

            const pagamento = await Pagamento.obterPorId(id_pagamento);

            if (!pagamento) {
                return res.status(404).json({ message: 'Pagamento não encontrado.' });
            }

            return res.status(200).json(pagamento);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao obter pagamento.', error: error.message });
        }
    }

    // Método para atualizar um pagamento
    static async atualizarPagamento(req, res) {
        try {
            const { id_pagamento } = req.params;
            const { id_agendamento, valor, metodo_pagamento, status } = req.body;

            // Valida os campos obrigatórios
            if (!id_agendamento || !valor || !metodo_pagamento || !status) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Verifica se o pagamento existe
            const pagamentoExistente = await Pagamento.obterPorId(id_pagamento);
            if (!pagamentoExistente) {
                return res.status(404).json({ message: 'Pagamento não encontrado.' });
            }

            // Atualiza o pagamento
            const pagamentoAtualizado = new Pagamento(id_pagamento, id_agendamento, valor, metodo_pagamento, status);
            await Pagamento.atualizar(pagamentoAtualizado);

            return res.status(200).json({ message: 'Pagamento atualizado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar pagamento.', error: error.message });
        }
    }

    // Método para deletar um pagamento
    static async deletarPagamento(req, res) {
        try {
            const { id_pagamento } = req.params;

            // Verifica se o pagamento existe
            const pagamentoExistente = await Pagamento.obterPorId(id_pagamento);
            if (!pagamentoExistente) {
                return res.status(404).json({ message: 'Pagamento não encontrado.' });
            }

            // Deleta o pagamento
            await Pagamento.deletar(id_pagamento);

            return res.status(200).json({ message: 'Pagamento deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar pagamento.', error: error.message });
        }
    }
}

module.exports = ControllerPagamento;
