const pool = require('../db/Conexao'); // Conexão com o banco de dados

// Classe para o modelo de EmpresaContatos
class EmpresaContatos {
    constructor(id, telefone, email, whatsapp, rua, bairro, municipio, facebook, youtube, instagram, data_criacao, empresa_id) {
        this.id = id;
        this.telefone = telefone;
        this.email = email;
        this.whatsapp = whatsapp;
        this.rua = rua;
        this.bairro = bairro;
        this.municipio = municipio;
        this.facebook = facebook;
        this.youtube = youtube;
        this.instagram = instagram;
        this.data_criacao = data_criacao;
        this.empresa_id = empresa_id;
    }

    // Método para salvar um novo contato da empresa no banco de dados
    static async salvar(contato) {
        const query = `INSERT INTO empresa_contatos (telefone, email, whatsapp, rua, bairro, municipio, facebook, youtube, instagram, data_criacao, empresa_id) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            contato.telefone,
            contato.email,
            contato.whatsapp,
            contato.rua,
            contato.bairro,
            contato.municipio,
            contato.facebook,
            contato.youtube,
            contato.instagram,
            contato.data_criacao,
            contato.empresa_id
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do contato inserido
    }

    // Método para obter todos os contatos de todas as empresas
    static async obterTodos() {
        const query = 'SELECT * FROM empresa_contatos';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os contatos
    }

    // Método para obter um contato pelo ID
    static async obterPorId(id) {
        const query = 'SELECT * FROM empresa_contatos WHERE id = ?';
        const [rows] = await pool.promise().query(query, [id]);
        return rows[0]; // Retorna o contato encontrado
    }

    // Método para obter todos os contatos de uma empresa por ID
    static async obterPorEmpresaId(empresa_id) {
        const query = 'SELECT * FROM empresa_contatos WHERE empresa_id = ?';
        const [rows] = await pool.promise().query(query, [empresa_id]);
        return rows; // Retorna todos os contatos da empresa específica
    }

    // Método para atualizar um contato da empresa
    static async atualizar(contato) {
        const query = `UPDATE empresa_contatos SET telefone = ?, email = ?, whatsapp = ?, rua = ?, bairro = ?, municipio = ?, 
                       facebook = ?, youtube = ?, instagram = ? WHERE id = ?`;
        const values = [
            contato.telefone,
            contato.email,
            contato.whatsapp,
            contato.rua,
            contato.bairro,
            contato.municipio,
            contato.facebook,
            contato.youtube,
            contato.instagram,
            contato.id
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um contato
    static async deletar(id) {
        const query = 'DELETE FROM empresa_contatos WHERE id = ?';
        await pool.promise().query(query, [id]);
    }
}

module.exports = EmpresaContatos;
