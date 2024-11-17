const Empresa = require('../models/Empresa'); // Importa o modelo de Empresa

class ControllerEmpresa {

    // Método para criar uma nova empresa
    static async criarEmpresa(req, res) {
        try {
            const { nome_empresa, nif_empresa, telefone, email, data_criacao, tipo_empresa, ativo, site_empresa, setor_empresa, rua, bairro, municipio } = req.body;

            // Validação básica
            if (!nome_empresa || !nif_empresa || !telefone || !email) {
                return res.status(400).json({ message: "Campos obrigatórios não fornecidos!" });
            }

            const empresa = new Empresa(null, nome_empresa, nif_empresa, telefone, email, data_criacao, tipo_empresa, ativo, site_empresa, setor_empresa, rua, bairro, municipio);
            const id_empresa = await Empresa.salvar(empresa);

            res.status(201).json({ message: "Empresa criada com sucesso!", id_empresa });
        } catch (error) {
            console.error("Erro ao cadastrar empresa:", error);
            res.status(500).json({ message: error.message });
        }
    }

    // Método para obter todas as empresas
    static async obterEmpresas(req, res) {
        try {
            const empresas = await Empresa.obterTodas();
            res.status(200).json(empresas);
        } catch (error) {
            console.error("Erro ao obter empresas:", error);
            res.status(500).json({ message: error.message });
        }
    }

    // Método para obter uma empresa pelo ID
    static async obterEmpresaPorId(req, res) {
        try {
            const { id_empresa } = req.params;
            const empresa = await Empresa.obterPorId(id_empresa);

            res.status(200).json(empresa);
        } catch (error) {
            console.error("Erro ao obter empresa:", error);
            res.status(500).json({ message: error.message });
        }
    }

    // Método para atualizar uma empresa
    static async atualizarEmpresa(req, res) {
        try {
            const { id_empresa } = req.params;
            const { nome_empresa, nif_empresa, telefone, email, data_criacao, tipo_empresa, ativo, site_empresa, setor_empresa, rua, bairro, municipio } = req.body;

            // Verificação básica
            if (!nome_empresa || !nif_empresa || !telefone || !email) {
                return res.status(400).json({ message: "Campos obrigatórios não fornecidos!" });
            }

            const empresa = new Empresa(id_empresa, nome_empresa, nif_empresa, telefone, email, data_criacao, tipo_empresa, ativo, site_empresa, setor_empresa, rua, bairro, municipio);
            await Empresa.atualizar(empresa);

            res.status(200).json({ message: "Empresa atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            res.status(500).json({ message: error.message });
        }
    }

    // Método para deletar uma empresa
    static async deletarEmpresa(req, res) {
        try {
            const { id_empresa } = req.params;
            await Empresa.deletar(id_empresa);
            res.status(200).json({ message: "Empresa deletada com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar empresa:", error);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ControllerEmpresa;

