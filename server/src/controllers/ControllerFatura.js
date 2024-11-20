const Fatura = require('../models/Fatura'); // Importa o modelo de Fatura

class ControllerFatura {

    // Método para criar uma nova fatura
    static async criarFatura(req, res) {
        try {
            const {
                nome_cliente,
                email_cliente,
                telefone_cliente,
                genero_cliente,
                marca_veiculo,
                modelo_veiculo,
                ano_veiculo,
                placa_veiculo,
                forma_pagamento,
                valor_desconto,
                valor_total,
                data_emissao,
                status_pagamento
            } = req.body;

            // Cria um objeto Fatura
            const fatura = new Fatura(
                null, // ID é auto-incrementado, então começamos com null
                nome_cliente,
                email_cliente,
                telefone_cliente,
                genero_cliente,
                marca_veiculo,
                modelo_veiculo,
                ano_veiculo,
                placa_veiculo,
                forma_pagamento,
                valor_desconto,
                valor_total,
                data_emissao,
                status_pagamento
            );

            // Salva a fatura no banco
            const id_fatura = await Fatura.salvar(fatura);

            // Retorna a resposta de sucesso
            res.status(201).json({ message: "Fatura criada com sucesso!", id_fatura });
        } catch (error) {
            console.error("Erro ao criar fatura:", error);
            res.status(500).json({ message: "Erro ao criar fatura" });
        }
    }

    // Método para obter todas as faturas
    static async obterFaturas(req, res) {
        try {
            const faturas = await Fatura.obterTodos();
            res.status(200).json(faturas);
        } catch (error) {
            console.error("Erro ao obter faturas:", error);
            res.status(500).json({ message: "Erro ao obter faturas" });
        }
    }

    // Método para obter uma fatura pelo ID
    static async obterFaturaPorId(req, res) {
        try {
            const { id_fatura } = req.params;
            const fatura = await Fatura.obterPorId(id_fatura);

            if (!fatura) {
                return res.status(404).json({ message: "Fatura não encontrada" });
            }

            res.status(200).json(fatura);
        } catch (error) {
            console.error("Erro ao obter fatura:", error);
            res.status(500).json({ message: "Erro ao obter fatura" });
        }
    }

    // Método para atualizar uma fatura
    static async atualizarFatura(req, res) {
        try {
            const { id_fatura } = req.params;
            const {
                nome_cliente,
                email_cliente,
                telefone_cliente,
                genero_cliente,
                marca_veiculo,
                modelo_veiculo,
                ano_veiculo,
                placa_veiculo,
                forma_pagamento,
                valor_desconto,
                valor_total,
                data_emissao,
                status_pagamento
            } = req.body;

            // Cria um objeto Fatura para atualização
            const fatura = new Fatura(
                id_fatura,
                nome_cliente,
                email_cliente,
                telefone_cliente,
                genero_cliente,
                marca_veiculo,
                modelo_veiculo,
                ano_veiculo,
                placa_veiculo,
                forma_pagamento,
                valor_desconto,
                valor_total,
                data_emissao,
                status_pagamento
            );

            // Atualiza a fatura no banco
            await Fatura.atualizar(fatura);

            // Retorna a resposta de sucesso
            res.status(200).json({ message: "Fatura atualizada com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar fatura:", error);
            res.status(500).json({ message: "Erro ao atualizar fatura" });
        }
    }

    // Método para deletar uma fatura
    static async deletarFatura(req, res) {
        try {
            const { id_fatura } = req.params;
            await Fatura.deletar(id_fatura);
            res.status(200).json({ message: "Fatura deletada com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar fatura:", error);
            res.status(500).json({ message: "Erro ao deletar fatura" });
        }
    }

    // Método para obter faturas por status de pagamento
    static async obterFaturasPorStatus(req, res) {
        try {
            const { status_pagamento } = req.params;
            const faturas = await Fatura.obterPorStatus(status_pagamento);

            if (faturas.length === 0) {
                return res.status(404).json({ message: `Nenhuma fatura encontrada com o status ${status_pagamento}` });
            }

            res.status(200).json(faturas);
        } catch (error) {
            console.error("Erro ao obter faturas por status:", error);
            res.status(500).json({ message: "Erro ao obter faturas por status" });
        }
    }

    static async contarFatura(req, res) {
        try {
            const totalClientes = await Fatura.contarTodasFaturas();
            res.status(200).json({ total: totalClientes });
        } catch (error) {
            console.error('Erro ao contar faturas:', error);
            res.status(500).json({ message: 'Erro ao contar faturas' });
        }
    }

}

module.exports = ControllerFatura;
