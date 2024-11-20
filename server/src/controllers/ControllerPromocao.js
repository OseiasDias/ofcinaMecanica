const Promocao = require('../models/Promocao'); // Importa o modelo de Promoção

class ControllerPromocao {
    // Método para criar uma nova promoção
    static async criarPromocao(req, res) {
        try {
            const { descricao, data_inicio, data_fim, desconto } = req.body;
            const promocao = new Promocao(null, descricao, data_inicio, data_fim, desconto);
            const id = await Promocao.salvar(promocao);
            res.status(201).json({ id_promocao: id, mensagem: 'Promoção criada com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao criar a promoção.' });
        }
    }

    // Método para obter todas as promoções
    static async obterPromocoes(req, res) {
        try {
            const promocoes = await Promocao.obterTodas();
            res.status(200).json(promocoes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao obter as promoções.' });
        }
    }

    // Método para obter uma promoção pelo ID
    static async obterPromocaoPorId(req, res) {
        try {
            const { id_promocao } = req.params;
            const promocao = await Promocao.obterPorId(id_promocao);
            if (!promocao) {
                return res.status(404).json({ mensagem: 'Promoção não encontrada.' });
            }
            res.status(200).json(promocao);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao obter a promoção.' });
        }
    }

    // Método para atualizar uma promoção
    static async atualizarPromocao(req, res) {
        try {
            const { id_promocao } = req.params;
            const { descricao, data_inicio, data_fim, desconto } = req.body;
            const promocao = new Promocao(id_promocao, descricao, data_inicio, data_fim, desconto);
            await Promocao.atualizar(promocao);
            res.status(200).json({ mensagem: 'Promoção atualizada com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao atualizar a promoção.' });
        }
    }

    // Método para deletar uma promoção
    static async deletarPromocao(req, res) {
        try {
            const { id_promocao } = req.params;
            await Promocao.deletar(id_promocao);
            res.status(200).json({ mensagem: 'Promoção deletada com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao deletar a promoção.' });
        }
    }
}

module.exports = ControllerPromocao;
