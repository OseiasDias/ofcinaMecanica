const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Serviço
class Servico {
    constructor(id_servico, nome_servico, descricao, preco) {
        this.id_servico = id_servico;
        this.nome_servico = nome_servico;
        this.descricao = descricao;
        this.preco = preco;
    }

    // Método para salvar um serviço no banco de dados
    static async salvar(servico) {
        const query = `INSERT INTO servico (nome_servico, descricao, preco) 
                       VALUES (?, ?, ?)`;
        const values = [
            servico.nome_servico,
            servico.descricao,
            servico.preco
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do serviço inserido
    }

    // Método para obter todos os serviços
    static async obterTodos() {
        const query = 'SELECT * FROM servico';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os serviços
    }

    // Método para obter um serviço pelo ID
    static async obterPorId(id_servico) {
        const query = 'SELECT * FROM servico WHERE id_servico = ?';
        const [rows] = await pool.promise().query(query, [id_servico]);
        return rows[0]; // Retorna o serviço encontrado
    }

    // Método para atualizar um serviço
    static async atualizar(servico) {
        const query = `UPDATE servico SET nome_servico = ?, descricao = ?, preco = ? 
                       WHERE id_servico = ?`;
        const values = [
            servico.nome_servico,
            servico.descricao,
            servico.preco,
            servico.id_servico
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um serviço
    static async deletar(id_servico) {
        const query = 'DELETE FROM servico WHERE id_servico = ?';
        await pool.promise().query(query, [id_servico]);
    }
}

module.exports = Servico;
