const Estoque = require('../models/Estoque'); // Importa o modelo de Estoque

// Controller para Estoque
class ControllerEstoque {

    // Método para criar um novo item no estoque
    static async criarItem(req, res) {
        try {
            const { nome_peca, quantidade, data_reposicao } = req.body;
            const novoItem = new Estoque(null, nome_peca, quantidade, data_reposicao);
            const idItem = await Estoque.salvar(novoItem);
            res.status(201).json({ message: 'Item adicionado com sucesso!', id_item: idItem });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar item.', error });
        }
    }

    // Método para obter todos os itens do estoque
    static async obterItens(req, res) {
        try {
            const itens = await Estoque.obterTodos();
            res.status(200).json(itens);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter itens.', error });
        }
    }

    // Método para obter um item do estoque por ID
    static async obterItemPorId(req, res) {
        try {
            const { id_item } = req.params;
            const item = await Estoque.obterPorId(id_item);
            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ message: 'Item não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter item.', error });
        }
    }

    // Método para atualizar um item no estoque
    static async atualizarItem(req, res) {
        try {
            const { id_item } = req.params;
            const { nome_peca, quantidade, data_reposicao } = req.body;
            const itemAtualizado = new Estoque(id_item, nome_peca, quantidade, data_reposicao);
            await Estoque.atualizar(itemAtualizado);
            res.status(200).json({ message: 'Item atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar item.', error });
        }
    }

    // Método para atualizar a quantidade de um item no estoque
    static async atualizarQuantidadeItem(req, res) {
        try {
            const { id_item } = req.params; // ID do item que queremos atualizar
            const { novaQuantidade } = req.body; // Nova quantidade fornecida

            // Atualiza a quantidade do item no banco de dados
            await Estoque.atualizarQuantidade(id_item, novaQuantidade);
            res.status(200).json({ message: 'Quantidade do item atualizada com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar quantidade do item.', error });
        }
    }

    // Método para deletar um item do estoque
    static async deletarItem(req, res) {
        try {
            const { id_item } = req.params;
            await Estoque.deletar(id_item);
            res.status(200).json({ message: 'Item deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar item.', error });
        }
    }

    // Método para contar o total de itens no estoque
    static async contarEstoque(req, res) {
        try {
            const totalItens = await Estoque.contarTodosEstoque();
            res.status(200).json({ total: totalItens });
        } catch (error) {
            console.error('Erro ao contar itens no estoque:', error);
            res.status(500).json({ message: 'Erro ao contar itens no estoque' });
        }
    }
}

module.exports = ControllerEstoque;
