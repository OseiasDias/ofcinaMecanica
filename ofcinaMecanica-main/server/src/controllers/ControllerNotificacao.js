const Notificacao = require('../models/Notificacao'); // Importa o modelo de Notificação

// Controller para Notificação
const ControllerNotificacao = {
    // Método para criar uma nova notificação
    async criarNotificacao(req, res) {
        try {
            const { id_cliente, mensagem, data_envio } = req.body;
            const novaNotificacao = new Notificacao(null, id_cliente, mensagem, data_envio);
            const idNotificacao = await Notificacao.salvar(novaNotificacao);
            res.status(201).json({ mensagem: 'Notificação criada com sucesso', id: idNotificacao });
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao criar notificação', erro: erro.message });
        }
    },

    // Método para obter todas as notificações
    async obterNotificacoes(req, res) {
        try {
            const notificacoes = await Notificacao.obterTodos();
            res.status(200).json(notificacoes);
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao obter notificações', erro: erro.message });
        }
    },

    // Método para obter uma notificação por ID
    async obterNotificacaoPorId(req, res) {
        try {
            const { id_notificacao } = req.params;
            const notificacao = await Notificacao.obterPorId(id_notificacao);
            if (notificacao) {
                res.status(200).json(notificacao);
            } else {
                res.status(404).json({ mensagem: 'Notificação não encontrada' });
            }
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao obter notificação', erro: erro.message });
        }
    },

    // Método para atualizar uma notificação
    async atualizarNotificacao(req, res) {
        try {
            const { id_notificacao } = req.params;
            const { id_cliente, mensagem, data_envio } = req.body;
            const notificacaoExistente = await Notificacao.obterPorId(id_notificacao);

            if (notificacaoExistente) {
                const notificacaoAtualizada = new Notificacao(id_notificacao, id_cliente, mensagem, data_envio);
                await Notificacao.atualizar(notificacaoAtualizada);
                res.status(200).json({ mensagem: 'Notificação atualizada com sucesso' });
            } else {
                res.status(404).json({ mensagem: 'Notificação não encontrada' });
            }
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao atualizar notificação', erro: erro.message });
        }
    },

    // Método para deletar uma notificação
    async deletarNotificacao(req, res) {
        try {
            const { id_notificacao } = req.params;
            const notificacaoExistente = await Notificacao.obterPorId(id_notificacao);

            if (notificacaoExistente) {
                await Notificacao.deletar(id_notificacao);
                res.status(200).json({ mensagem: 'Notificação deletada com sucesso' });
            } else {
                res.status(404).json({ mensagem: 'Notificação não encontrada' });
            }
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao deletar notificação', erro: erro.message });
        }
    }
};

module.exports = ControllerNotificacao;
