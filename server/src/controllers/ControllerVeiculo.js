const Veiculo = require('../models/Veiculo'); // Importa o modelo Veiculo

// Controller para Veiculo
class ControllerVeiculo {
    // Método para criar um novo veículo
    static async criarVeiculo(req, res) {
        try {
            const veiculoData = req.body;
            const novoVeiculoId = await Veiculo.salvar(veiculoData);
            res.status(201).json({ id_veiculo: novoVeiculoId, message: "Veículo cadastrado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao cadastrado veículo." });
        }
    }

    // Método para obter todos os veículos
    static async obterVeiculos(req, res) {
        try {
            const veiculos = await Veiculo.obterTodos();
            res.status(200).json(veiculos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao obter veículos." });
        }
    }

    // Método para obter um veículo por ID
    static async obterVeiculoPorId(req, res) {
        try {
            const { id_veiculo } = req.params;
            const veiculo = await Veiculo.obterPorId(id_veiculo);
            if (veiculo) {
                res.status(200).json(veiculo);
            } else {
                res.status(404).json({ message: "Veículo não encontrado." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao obter veículo." });
        }
    }

    // Método para obter veículos por ID do cliente
    static async obterVeiculosPorIdCliente(req, res) {
        try {
            const { id_cliente } = req.params;
            const veiculos = await Veiculo.obterPorIdCliente(id_cliente);
            if (veiculos.length > 0) {
                res.status(200).json(veiculos);
            } else {
                res.status(404).json({ message: "Nenhum veículo encontrado para este cliente." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao obter veículos do cliente." });
        }
    }

    // Método para atualizar um veículo
    static async atualizarVeiculo(req, res) {
        try {
            const { id_veiculo } = req.params;
            const veiculoData = req.body;
            veiculoData.id_veiculo = id_veiculo;

            await Veiculo.atualizar(veiculoData);
            res.status(200).json({ message: "Veículo atualizado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao atualizar veículo." });
        }
    }

    // Método para deletar um veículo
    static async deletarVeiculo(req, res) {
        try {
            const { id_veiculo } = req.params;
            await Veiculo.deletar(id_veiculo);
            res.status(200).json({ message: "Veículo deletado com sucesso!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao deletar veículo." });
        }
    }
}

module.exports = ControllerVeiculo;
