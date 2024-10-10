const Agendamento = require('../models/Agendamento'); // Importa o modelo Agendamento

class ControllerAgendamento {
    // Método para criar um novo agendamento
    static async criarAgendamento(req, res) {
        try {
            const { data, id_cliente, id_veiculo, id_servico, status } = req.body;
            const agendamento = new Agendamento(null, data, id_cliente, id_veiculo, id_servico, status);
            const id = await Agendamento.salvar(agendamento);
            res.status(201).json({ id, message: 'Agendamento criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar agendamento' });
        }
    }

    // Método para obter todos os agendamentos
    static async obterAgendamentos(req, res) {
        try {
            const agendamentos = await Agendamento.obterTodos();
            res.status(200).json(agendamentos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter agendamentos' });
        }
    }

    // Método para obter um agendamento por ID
    static async obterAgendamentoPorId(req, res) {
        try {
            const { id_agendamento } = req.params;
            const agendamento = await Agendamento.obterPorId(id_agendamento);
            if (agendamento) {
                res.status(200).json(agendamento);
            } else {
                res.status(404).json({ message: 'Agendamento não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter agendamento' });
        }
    }

    // Método para atualizar um agendamento
    static async atualizarAgendamento(req, res) {
        try {
            const { id_agendamento } = req.params;
            const { data, id_cliente, id_veiculo, id_servico, status } = req.body;
            const agendamento = new Agendamento(id_agendamento, data, id_cliente, id_veiculo, id_servico, status);
            await Agendamento.atualizar(agendamento);
            res.status(200).json({ message: 'Agendamento atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar agendamento' });
        }
    }

    // Método para deletar um agendamento
    static async deletarAgendamento(req, res) {
        try {
            const { id_agendamento } = req.params;
            await Agendamento.deletar(id_agendamento);
            res.status(200).json({ message: 'Agendamento deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar agendamento' });
        }
    }
}

module.exports = ControllerAgendamento;
