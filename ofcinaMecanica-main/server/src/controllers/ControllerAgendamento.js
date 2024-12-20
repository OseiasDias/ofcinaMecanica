const Agendamento = require('../models/Agendamento'); // Importa o modelo Agendamento

class ControllerAgendamento {
    // Método para criar um novo agendamento
    static async criarAgendamento(req, res) {
        try {
            const { data, id_cliente, id_veiculo, id_servico, status, descricao, motivoAdiar } = req.body; // Inclui descricao
            const agendamento = new Agendamento(null, data, id_cliente, id_veiculo, id_servico, status, descricao);
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


    // Método para obter agendamentos por ID do cliente
    static async obterAgendamentosPorCliente(req, res) {
        try {
            const { id_cliente } = req.params;
            const agendamentos = await Agendamento.obterPorCliente(id_cliente);
            if (agendamentos.length > 0) {
                res.status(200).json(agendamentos);
            } else {
                res.status(404).json({ message: 'Nenhum agendamento encontrado para este cliente' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter agendamentos do cliente' });
        }
    }

    // Método para atualizar um agendamento
    static async atualizarAgendamento(req, res) {
        try {
            const { id_agendamento } = req.params;
            const { data, id_cliente, id_veiculo, id_servico, status, descricao, motivoAdiar } = req.body; // Inclui descricao
            const agendamento = new Agendamento(id_agendamento, data, id_cliente, id_veiculo, id_servico, status, descricao, motivoAdiar);
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

    // Método para atualizar o status de um agendamento
    static async atualizarStatus(req, res) {
        try {
            const { id_agendamento } = req.params; // Pega o id_agendamento da URL
            const { novoStatus } = req.body; // Pega o novoStatus do corpo da requisição

            // Mapeia os valores de status de string para números
            let statusValue;
            if (novoStatus === 'Confirmado') {
                statusValue = 1;  // Mapeando Confirmado para 1
            } else if (novoStatus === 'Cancelado') {
                statusValue = 0;  // Mapeando Cancelado para 0
            } else {
                return res.status(400).json({ message: "Status inválido. Deve ser 'Confirmado' ou 'Cancelado'." });
            }

            // Chama o método do modelo para atualizar o status do agendamento
            const result = await Agendamento.atualizarStatus(id_agendamento, statusValue);

            res.status(200).json(result); // Retorna uma mensagem de sucesso
        } catch (error) {
            console.error("Erro ao atualizar status do agendamento:", error);
            res.status(400).json({ message: error.message }); // Retorna a mensagem de erro caso algo falhe
        }
    }

    // Método para adiar um agendamento
    static async adiarAgendamento(req, res) {
        try {
            const { id_agendamento } = req.params;  // Captura o ID do agendamento
            const { novaData, motivoAdiar } = req.body;  // Captura os dados do corpo da requisição

            // Verifique se todos os parâmetros foram enviados
            if (!novaData || !motivoAdiar) {
                return res.status(400).json({ message: 'Dados insuficientes. Necessário novaData e motivoAdiar.' });
            }

            // Chame o método no modelo para adiar o agendamento
            const result = await Agendamento.adiarAgendamento(id_agendamento, novaData, motivoAdiar);

            // Retorna a resposta com sucesso
            res.status(200).json({ message: 'Agendamento adiado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao adiantar agendamento.' });
        }
    }


    static async contarAgendamentos(req, res) {
        try {
            const totalAgendamentos = await Agendamento.contarTodosAgendamentos();
            res.status(200).json({ total: totalAgendamentos });
        } catch (error) {
            console.error('Erro ao contar agendamentos:', error);
            res.status(500).json({
                message: 'Erro ao contar agendamentos',
                error: error.message // Evite exibir detalhes do erro em produção
            });
        }
    }


}

module.exports = ControllerAgendamento;
