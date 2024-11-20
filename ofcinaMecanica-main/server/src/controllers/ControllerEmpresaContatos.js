const EmpresaContatos = require('../models/EmpresaContatos'); // Importa o modelo de EmpresaContatos

class ControllerEmpresaContatos {

    // Método para criar um novo contato de empresa
    static async criarContato(req, res) {
        try {
            const { telefone, email, whatsapp, rua, bairro, municipio, facebook, youtube, instagram, empresa_id } = req.body;

            const contato = new EmpresaContatos(null, telefone, email, whatsapp, rua, bairro, municipio, facebook, youtube, instagram, null, empresa_id);
            const id_contato = await EmpresaContatos.salvar(contato);

            res.status(201).json({ message: "Contato criado com sucesso!", id_contato });
        } catch (error) {
            console.error("Erro ao cadastrar contato:", error);
            res.status(500).json({ message: "Erro ao cadastrar contato" });
        }
    }

    // Método para obter todos os contatos
    static async obterContatos(req, res) {
        try {
            const contatos = await EmpresaContatos.obterTodos();
            res.status(200).json(contatos);
        } catch (error) {
            console.error("Erro ao obter contatos:", error);
            res.status(500).json({ message: "Erro ao obter contatos" });
        }
    }

    // Método para obter um contato por ID
    static async obterContatoPorId(req, res) {
        try {
            const { id } = req.params;
            const contato = await EmpresaContatos.obterPorId(id);

            if (!contato) {
                return res.status(404).json({ message: "Contato não encontrado" });
            }

            res.status(200).json(contato);
        } catch (error) {
            console.error("Erro ao obter contato:", error);
            res.status(500).json({ message: "Erro ao obter contato" });
        }
    }

    // Método para obter todos os contatos de uma empresa
    static async obterContatosPorEmpresaId(req, res) {
        try {
            const { empresa_id } = req.params;
            const contatos = await EmpresaContatos.obterPorEmpresaId(empresa_id);

            res.status(200).json(contatos);
        } catch (error) {
            console.error("Erro ao obter contatos da empresa:", error);
            res.status(500).json({ message: "Erro ao obter contatos da empresa" });
        }
    }

    // Método para atualizar um contato de empresa
    static async atualizarContato(req, res) {
        try {
            const { id } = req.params;
            const { telefone, email, whatsapp, rua, bairro, municipio, facebook, youtube, instagram } = req.body;

            const contato = new EmpresaContatos(id, telefone, email, whatsapp, rua, bairro, municipio, facebook, youtube, instagram, null, null);
            await EmpresaContatos.atualizar(contato);

            res.status(200).json({ message: "Contato atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar contato:", error);
            res.status(500).json({ message: "Erro ao atualizar contato" });
        }
    }

    // Método para deletar um contato
    static async deletarContato(req, res) {
        try {
            const { id } = req.params;
            await EmpresaContatos.deletar(id);
            res.status(200).json({ message: "Contato deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar contato:", error);
            res.status(500).json({ message: "Erro ao deletar contato" });
        }
    }
}

module.exports = ControllerEmpresaContatos;
