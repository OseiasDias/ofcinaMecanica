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


    // Método para obter um cliente pelo email
    static async obterClientePorEmail(req, res) {
        try {
            const { email } = req.params;
            const cliente = await Cliente.obterPorEmail(email);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }

            res.status(200).json(cliente);
        } catch (error) {
            console.error("Erro ao obter cliente por email:", error);
            res.status(500).json({ message: "Erro ao obter cliente por email" });
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

    // Método para obter o maior id_cliente
static async obterMaiorId(req, res) {
    try {
        const maiorId = await Cliente.obterMaiorId(); // Chama o método do modelo
        res.status(200).json({ maior_id: maiorId });
    } catch (error) {
        console.error("Erro ao obter maior id_cliente:", error);
        res.status(500).json({ message: "Erro ao obter maior id_cliente" });
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


   // Método para atualizar o status de um cliente
// Método para atualizar o status de um cliente
static async atualizarStatus(req, res) {
    try {
        const { id_cliente } = req.params; // Pega o id_cliente da URL
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

        // Chama o método do modelo para atualizar o status
        const result = await Cliente.atualizarStatus(id_cliente, statusValue);

        res.status(200).json(result); // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error("Erro ao atualizar status do cliente:", error);
        res.status(400).json({ message: error.message }); // Retorna a mensagem de erro caso algo falhe
    }
}

}

module.exports = ControllerCliente;
