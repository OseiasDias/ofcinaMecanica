const Usuario = require('../models/Usuario'); // Importa o modelo Usuario

class ControllerUsuario {
    // Método para criar um novo usuário
    static async criarUsuario(req, res) {
        try {
            // Desestruturando os dados de entrada
            const { nome, email, telefone, senha, nivel_acesso, genero, data_nascimento, foto, estado, endereco, bilhete_identidade, iban, data_admissao, salario } = req.body;

            // Criando uma instância do usuário com os novos campos
            const usuario = new Usuario(null, nome, email, telefone, senha, nivel_acesso, genero, data_nascimento, foto, estado, endereco, bilhete_identidade, iban, data_admissao, salario);

            // Salvando o usuário no banco de dados
            const id = await Usuario.salvar(usuario);
            res.status(201).json({ id, message: 'Usuário criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar usuário' });
        }
    }

    // Método para obter todos os usuários
    static async obterUsuarios(req, res) {
        try {
            const usuarios = await Usuario.obterTodos();
            res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter usuários' });
        }
    }

    // Método para obter um usuário por ID
    static async obterUsuarioPorId(req, res) {
        try {
            const { id_usuario } = req.params;
            const usuario = await Usuario.obterPorId(id_usuario);
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter usuário' });
        }
    }

    // Método para atualizar um usuário
    static async atualizarUsuario(req, res) {
        try {
            const { id_usuario } = req.params;
            const { nome, email, telefone, senha, nivel_acesso, genero, data_nascimento, foto, estado, endereco, bilhete_identidade, iban, data_admissao, salario } = req.body;

            // Criando uma instância do usuário com os dados fornecidos
            const usuario = new Usuario(id_usuario, nome, email, telefone, senha, nivel_acesso, genero, data_nascimento, foto, estado, endereco, bilhete_identidade, iban, data_admissao, salario);

            // Atualizando o usuário no banco de dados
            await Usuario.atualizar(usuario);
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar usuário' });
        }
    }

    // Método para deletar um usuário
    static async deletarUsuario(req, res) {
        try {
            const { id_usuario } = req.params;
            await Usuario.deletar(id_usuario);
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar usuário' });
        }
    }

    // Método para obter um usuário por email (para login)
    static async obterUsuarioPorEmail(req, res) {
        try {
            const { email } = req.params;
            const usuario = await Usuario.obterPorEmail(email);
            if (usuario) {
                res.status(200).json(usuario);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter usuário' });
        }
    }


    // Método para atualizar o status (estado) de um usuário
    static async atualizarStatus(req, res) {
        try {
            const { id_usuario } = req.params; // Pega o id_usuario da URL
            const { novoStatus } = req.body; // Pega o novoStatus do corpo da requisição

            // Mapeia os valores de status de string para números
            let statusValue;
            if (novoStatus === 'Ativo') {
                statusValue = 1;  // Mapeando Confirmado para 1
           } else if (novoStatus === 'Bloqueado') {
               statusValue = 0;  // Mapeando Cancelado para 0
           } else {
                return res.status(400).json({ message: "Status inválido. Deve ser 'Confirmado' ou 'Cancelado'." });
            }

            // Chama o método do modelo para atualizar o status
            const result = await Usuario.atualizarStatus(id_usuario, statusValue);

            res.status(200).json(result); // Retorna uma mensagem de sucesso
        } catch (error) {
            console.error("Erro ao atualizar status do usuário:", error);
            res.status(400).json({ message: error.message }); // Retorna a mensagem de erro caso algo falhe
        }
    }
}

module.exports = ControllerUsuario;
