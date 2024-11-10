const Carro = require('../models/Carro');

class CarroController {
    static async adicionar(req, res) {
        try {
            const { marca, modelo, ano, placa, id_cliente, fotos, status_reparacao } = req.body;

            if (!marca || !modelo || !ano || !placa || !id_cliente || !status_reparacao) {
                return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
            }

            const novoCarro = new Carro(null, marca, modelo, ano, placa, id_cliente, fotos, status_reparacao);
            const idVeiculo = await Carro.salvar(novoCarro);

            res.status(201).json({ message: 'Carro cadastrado com sucesso!', id_veiculo: idVeiculo });
        } catch (error) {
            console.error("Erro ao cadastrar o carro:", error);
            res.status(500).json({ message: 'Erro ao cadastrar o carro.' });
        }
    }

    static async obterTodos(req, res) {
        try {
            const carros = await Carro.obterTodos();
            res.status(200).json(carros);
        } catch (error) {
            console.error("Erro ao buscar os carros:", error);
            res.status(500).json({ message: 'Erro ao buscar os carros.' });
        }
    }

    static async obterPorId(req, res) {
        try {
            const { id_veiculo } = req.params;
            const carro = await Carro.obterPorId(id_veiculo);

            if (!carro) {
                return res.status(404).json({ message: 'Carro não encontrado.' });
            }

            res.status(200).json(carro);
        } catch (error) {
            console.error("Erro ao buscar o carro:", error);
            res.status(500).json({ message: 'Erro ao buscar o carro.' });
        }
    }

    static async obterCarrosPorCliente(req, res) {
        try {
            const { id_cliente } = req.params;
            const carros = await Carro.obterPorIdCliente(id_cliente);

            if (carros.length === 0) {
                return res.status(404).json({ message: 'Nenhum carro encontrado para este cliente.' });
            }

            res.status(200).json(carros);
        } catch (error) {
            console.error("Erro ao buscar os carros do cliente:", error);
            res.status(500).json({ message: 'Erro ao buscar os carros do cliente.' });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id_veiculo } = req.params;
            const { marca, modelo, ano, placa, id_cliente, fotos, status_reparacao } = req.body;

            const carroExistente = await Carro.obterPorId(id_veiculo);
            if (!carroExistente) {
                return res.status(404).json({ message: 'Carro não encontrado.' });
            }

            const carroAtualizado = new Carro(id_veiculo, marca, modelo, ano, placa, id_cliente, fotos, status_reparacao);
            await Carro.atualizar(carroAtualizado);

            res.status(200).json({ message: 'Carro atualizado com sucesso!' });
        } catch (error) {
            console.error("Erro ao atualizar o carro:", error);
            res.status(500).json({ message: 'Erro ao atualizar o carro.' });
        }
    }

    static async excluir(req, res) {
        try {
            const { id_veiculo } = req.params;

            const carroExistente = await Carro.obterPorId(id_veiculo);
            if (!carroExistente) {
                return res.status(404).json({ message: 'Carro não encontrado.' });
            }

            await Carro.deletar(id_veiculo);
            res.status(200).json({ message: 'Carro excluído com sucesso!' });
        } catch (error) {
            console.error("Erro ao excluir o carro:", error);
            res.status(500).json({ message: 'Erro ao excluir o carro.' });
        }
    }
}

module.exports = CarroController;
