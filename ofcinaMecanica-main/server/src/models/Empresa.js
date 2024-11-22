const pool = require('../db/Conexao'); // Certifique-se de que a conexão com o banco está correta

class Empresa {
    constructor(id_empresa, nome_empresa, nif_empresa, telefone, email, data_criacao, tipo_empresa, ativo, site_empresa, setor_empresa, rua, bairro, municipio) {
        this.id_empresa = id_empresa;
        this.nome_empresa = nome_empresa;
        this.nif_empresa = nif_empresa;
        this.telefone = telefone;
        this.email = email;
        this.data_criacao = data_criacao;
        this.tipo_empresa = tipo_empresa;
        this.ativo = ativo;
        this.site_empresa = site_empresa;
        this.setor_empresa = setor_empresa;
        this.rua = rua;
        this.bairro = bairro;
        this.municipio = municipio;
    }

    // Método para salvar uma empresa no banco de dados
    static async salvar(empresa) {
        const query = `INSERT INTO empresa (nome_empresa, nif_empresa, telefone, email, data_criacao, tipo_empresa, ativo, site_empresa, setor_empresa, rua, bairro, municipio) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            empresa.nome_empresa,
            empresa.nif_empresa,
            empresa.telefone,
            empresa.email,
            empresa.data_criacao,
            empresa.tipo_empresa,
            empresa.ativo,
            empresa.site_empresa,
            empresa.setor_empresa,
            empresa.rua,
            empresa.bairro,
            empresa.municipio
        ];

        try {
            const [result] = await pool.promise().query(query, values);
            return result.insertId; // Retorna o ID da empresa inserida
        } catch (error) {
            console.error("Erro ao salvar empresa:", error);
            throw new Error("Erro ao salvar empresa no banco de dados");
        }
    }

    // Método para obter todas as empresas
    static async obterTodas() {
        const query = 'SELECT * FROM empresa';
        try {
            const [rows] = await pool.promise().query(query);
            return rows;
        } catch (error) {
            console.error("Erro ao obter empresas:", error);
            throw new Error("Erro ao buscar empresas no banco de dados");
        }
    }

    // Método para obter uma empresa pelo ID
    static async obterPorId(id_empresa) {
        const query = 'SELECT * FROM empresa WHERE id_empresa = ?';
        try {
            const [rows] = await pool.promise().query(query, [id_empresa]);
            if (rows.length === 0) {
                throw new Error("Empresa não encontrada");
            }
            return rows[0]; // Retorna a primeira empresa encontrada
        } catch (error) {
            console.error("Erro ao obter empresa:", error);
            throw new Error("Erro ao buscar empresa no banco de dados");
        }
    }

    // Método para atualizar uma empresa
    static async atualizar(empresa) {
        const values = [
            empresa.nome_empresa,
            empresa.nif_empresa,
            empresa.telefone,
            empresa.email,
            empresa.data_criacao,
            empresa.tipo_empresa,
            empresa.ativo,
            empresa.site_empresa,
            empresa.setor_empresa,
            empresa.rua,
            empresa.bairro,
            empresa.municipio
        ];

        const query = `UPDATE empresa SET nome_empresa = ?, nif_empresa = ?, telefone = ?, email = ?, 
                       data_criacao = ?, tipo_empresa = ?, ativo = ?, site_empresa = ?, setor_empresa = ?, rua = ?, bairro = ?, municipio = ? 
                       WHERE id_empresa = ?`;
        values.push(empresa.id_empresa); // Adiciona o ID da empresa ao final do array

        try {
            await pool.promise().query(query, values);
        } catch (error) {
            console.error("Erro ao atualizar empresa:", error);
            throw new Error("Erro ao atualizar empresa no banco de dados");
        }
    }

    // Método para deletar uma empresa
    static async deletar(id_empresa) {
        const query = 'DELETE FROM empresa WHERE id_empresa = ?';
        try {
            await pool.promise().query(query, [id_empresa]);
        } catch (error) {
            console.error("Erro ao deletar empresa:", error);
            throw new Error("Erro ao deletar empresa do banco de dados");
        }
    }

    // Método para obter uma empresa pelo NIF (se necessário para buscas)
    static async obterPorNif(nif_empresa) {
        const query = 'SELECT * FROM empresa WHERE nif_empresa = ?';
        try {
            const [rows] = await pool.promise().query(query, [nif_empresa]);
            return rows[0]; // Retorna a empresa encontrada
        } catch (error) {
            console.error("Erro ao obter empresa pelo NIF:", error);
            throw new Error("Erro ao buscar empresa pelo NIF");
        }
    }
}

module.exports = Empresa;
