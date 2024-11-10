const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Empresa
class Empresa {
    constructor(id_empresa, nome_empresa, nif_empresa, endereco, telefone, email, data_criacao, tipo_empresa, ativo, site_empresa, setor_empresa) {
        this.id_empresa = id_empresa;
        this.nome_empresa = nome_empresa;
        this.nif_empresa = nif_empresa;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.data_criacao = data_criacao;
        this.tipo_empresa = tipo_empresa;
        this.ativo = ativo;
        this.site_empresa = site_empresa;
        this.setor_empresa = setor_empresa;
    }

    // Método para salvar uma empresa no banco de dados
    static async salvar(empresa) {
        const query = `INSERT INTO empresa (nome_empresa, nif_empresa, endereco, telefone, email, data_criacao, tipo_empresa, ativo, site_empresa, setor_empresa) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            empresa.nome_empresa,
            empresa.nif_empresa,
            empresa.endereco,
            empresa.telefone,
            empresa.email,
            empresa.data_criacao,
            empresa.tipo_empresa,
            empresa.ativo,
            empresa.site_empresa,
            empresa.setor_empresa
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID da empresa inserida
    }

    // Método para obter todas as empresas
    static async obterTodas() {
        const query = 'SELECT * FROM empresa';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todas as empresas
    }

    // Método para obter uma empresa pelo ID
    static async obterPorId(id_empresa) {
        const query = 'SELECT * FROM empresa WHERE id_empresa = ?';
        const [rows] = await pool.promise().query(query, [id_empresa]);
        return rows[0]; // Retorna a empresa encontrada
    }

    // Método para atualizar uma empresa
    static async atualizar(empresa) {
        const values = [
            empresa.nome_empresa,
            empresa.nif_empresa,
            empresa.endereco,
            empresa.telefone,
            empresa.email,
            empresa.data_criacao,
            empresa.tipo_empresa,
            empresa.ativo,
            empresa.site_empresa,
            empresa.setor_empresa
        ];

        const query = `UPDATE empresa SET nome_empresa = ?, nif_empresa = ?, endereco = ?, telefone = ?, email = ?, 
                       data_criacao = ?, tipo_empresa = ?, ativo = ?, site_empresa = ?, setor_empresa = ? 
                       WHERE id_empresa = ?`;
        values.push(empresa.id_empresa); // Adiciona o ID da empresa ao final do array
        await pool.promise().query(query, values);
    }

    // Método para deletar uma empresa
    static async deletar(id_empresa) {
        const query = 'DELETE FROM empresa WHERE id_empresa = ?';
        await pool.promise().query(query, [id_empresa]);
    }

    // Método para obter uma empresa pelo NIF (se necessário para buscas)
    static async obterPorNif(nif_empresa) {
        const query = 'SELECT * FROM empresa WHERE nif_empresa = ?';
        const [rows] = await pool.promise().query(query, [nif_empresa]);
        return rows[0]; // Retorna a empresa encontrada
    }
}

module.exports = Empresa;
