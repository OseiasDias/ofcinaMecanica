const Cliente = require('../models/Cliente'); // Importa o modelo de Cliente

class ControllerCliente {
    // Método para criar um novo cliente
    static async criarCliente(req, res) {
        try {
            const { nome, email, telefone, endereco, genero, data_nascimento, historico_atendimentos, foto, estado, senha } = req.body;

            const cliente = new Cliente(null, nome, email, telefone, endereco, genero, data_nascimento, historico_atendimentos, foto, estado, senha);
            const id_cliente = await Cliente.salvar(cliente);

            res.status(201).json({ message: "Cliente criado com sucesso!", id_cliente });
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            res.status(500).json({ message: "Verifique o seu email  e numero de telefone, ja existem " });
        }
    }

    // Método para obter todos os clientes
    static async obterClientes(req, res) {
        try {
            const clientes = await Cliente.obterTodos();
            res.status(200).json(clientes);
        } catch (error) {
            console.error("Erro ao obter clientes:", error);
            res.status(500).json({ message: "Erro ao obter clientes" });
        }
    }

    // Método para obter um cliente pelo ID
    static async obterClientePorId(req, res) {
        try {
            const { id_cliente } = req.params;
            const cliente = await Cliente.obterPorId(id_cliente);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }

            res.status(200).json(cliente);
        } catch (error) {
            console.error("Erro ao obter cliente:", error);
            res.status(500).json({ message: "Erro ao obter cliente" });
        }
    }

    // Método para atualizar um cliente
    static async atualizarCliente(req, res) {
        try {
            const { id_cliente } = req.params;
            const { nome, email, telefone, endereco, genero, data_nascimento, historico_atendimentos, foto, estado, senha } = req.body;

            const cliente = new Cliente(id_cliente, nome, email, telefone, endereco, genero, data_nascimento, historico_atendimentos, foto, estado, senha);
            await Cliente.atualizar(cliente);

            res.status(200).json({ message: "Cliente atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            res.status(500).json({ message: "Erro ao atualizar cliente" });
        }
    }

    // Método para deletar um cliente
    static async deletarCliente(req, res) {
        try {
            const { id_cliente } = req.params;
            await Cliente.deletar(id_cliente);
            res.status(200).json({ message: "Cliente deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            res.status(500).json({ message: "Erro ao deletar cliente" });
        }
    }

    // Método para fazer login do cliente
    static async loginCliente(req, res) {
        try {
            const { email, senha } = req.body;
            const cliente = await Cliente.login(email, senha); // Chama o método de login do modelo

            res.status(200).json({
                message: "Login bem-sucedido!",
                cliente // Retorna os dados do cliente (ou pode retornar apenas o ID, se preferir)
            });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(401).json({ message: "E-mail ou senha inválidos" }); // Erro de autenticação
        }
    } 
}

module.exports = ControllerCliente;
