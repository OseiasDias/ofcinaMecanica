const Servico = require('../models/Servico'); // Importa o modelo de Serviço

class ControllerServico {
    // Método para criar um novo serviço
    static async criarServico(req, res) {
        try {
            const { nome_servico, descricao, preco } = req.body; // Extrai os dados do corpo da requisição
            const novoServico = new Servico(null, nome_servico, descricao, preco); // Cria uma nova instância de Serviço
            const idServico = await Servico.salvar(novoServico); // Salva o serviço no banco de dados
            res.status(201).json({ id_servico: idServico, mensagem: 'Serviço criado com sucesso.' }); // Retorna o ID do novo serviço
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao criar o serviço.' }); // Retorna erro em caso de falha
        }
    }

    // Método para obter todos os serviços
    static async obterServicos(req, res) {
        try {
            const servicos = await Servico.obterTodos(); // Obtém todos os serviços do banco de dados
            res.status(200).json(servicos); // Retorna a lista de serviços
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao obter os serviços.' }); // Retorna erro em caso de falha
        }
    }

    // Método para obter um serviço por ID
    static async obterServicoPorId(req, res) {
        try {
            const { id_servico } = req.params; // Extrai o ID da requisição
            const servico = await Servico.obterPorId(id_servico); // Obtém o serviço pelo ID
            if (!servico) {
                return res.status(404).json({ mensagem: 'Serviço não encontrado.' }); // Retorna erro se o serviço não for encontrado
            }
            res.status(200).json(servico); // Retorna o serviço encontrado
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao obter o serviço.' }); // Retorna erro em caso de falha
        }
    }

    // Método para atualizar um serviço
    static async atualizarServico(req, res) {
        try {
            const { id_servico } = req.params; // Extrai o ID da requisição
            const { nome_servico, descricao, preco } = req.body; // Extrai os dados do corpo da requisição
            const servicoAtualizado = new Servico(id_servico, nome_servico, descricao, preco); // Cria uma nova instância de Serviço com os dados atualizados
            await Servico.atualizar(servicoAtualizado); // Atualiza o serviço no banco de dados
            res.status(200).json({ mensagem: 'Serviço atualizado com sucesso.' }); // Retorna sucesso
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao atualizar o serviço.' }); // Retorna erro em caso de falha
        }
    }

    // Método para deletar um serviço
    static async deletarServico(req, res) {
        try {
            const { id_servico } = req.params; // Extrai o ID da requisição
            await Servico.deletar(id_servico); // Deleta o serviço do banco de dados
            res.status(200).json({ mensagem: 'Serviço deletado com sucesso.' }); // Retorna sucesso
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensagem: 'Erro ao deletar o serviço.' }); // Retorna erro em caso de falha
        }
    }
}

module.exports = ControllerServico; // Exporta o controller
