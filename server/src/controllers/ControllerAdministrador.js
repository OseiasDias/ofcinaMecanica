const Administrador = require('../models/Administrador'); // Importa o modelo de Administrador

class ControllerAdministrador {

    // Método para criar um novo administrador
    static async criarAdministrador(req, res) {
        try {
            const { nome, email, telefone, senha, genero, estado, data_nascimento, foto } = req.body;

            const administrador = new Administrador(null, nome, email, telefone, senha, genero, estado, data_nascimento, foto);
            const id_administrador = await Administrador.salvar(administrador);

            res.status(201).json({ message: "Administrador criado com sucesso!", id_administrador });
        } catch (error) {
            console.error("Erro ao cadastrar administrador:", error);
            res.status(500).json({ message: "Erro ao cadastrar administrador" });
        }
    }

    // Método para obter todos os administradores
    static async obterAdministradores(req, res) {
        try {
            const administradores = await Administrador.obterTodos();
            res.status(200).json(administradores);
        } catch (error) {
            console.error("Erro ao obter administradores:", error);
            res.status(500).json({ message: "Erro ao obter administradores" });
        }
    }

    // Método para obter um administrador pelo ID
    static async obterAdministradorPorId(req, res) {
        try {
            const { id_administrador } = req.params;
            const administrador = await Administrador.obterPorId(id_administrador);

            if (!administrador) {
                return res.status(404).json({ message: "Administrador não encontrado" });
            }

            res.status(200).json(administrador);
        } catch (error) {
            console.error("Erro ao obter administrador:", error);
            res.status(500).json({ message: "Erro ao obter administrador" });
        }
    }

    // Método para atualizar um administrador
    static async atualizarAdministrador(req, res) {
        try {
            const { id_administrador } = req.params;
            const { nome, email, telefone, senha, genero, estado, data_nascimento, foto } = req.body;

            const administrador = new Administrador(id_administrador, nome, email, telefone, senha, genero, estado, data_nascimento, foto);
            await Administrador.atualizar(administrador);

            res.status(200).json({ message: "Administrador atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar administrador:", error);
            res.status(500).json({ message: "Erro ao atualizar administrador" });
        }
    }

    // Método para deletar um administrador
    static async deletarAdministrador(req, res) {
        try {
            const { id_administrador } = req.params;
            await Administrador.deletar(id_administrador);
            res.status(200).json({ message: "Administrador deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar administrador:", error);
            res.status(500).json({ message: "Erro ao deletar administrador" });
        }
    }
}

module.exports = ControllerAdministrador;
