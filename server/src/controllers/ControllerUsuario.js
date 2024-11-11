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
}

module.exports = ControllerUsuario;
