const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Notificação
class Notificacao {
    constructor(id_notificacao, id_cliente, mensagem, data_envio) {
        this.id_notificacao = id_notificacao;
        this.id_cliente = id_cliente;
        this.mensagem = mensagem;
        this.data_envio = data_envio;
    }

    // Método para salvar uma notificação no banco de dados
    static async salvar(notificacao) {
        const query = `INSERT INTO notificacao (id_cliente, mensagem, data_envio) 
                       VALUES (?, ?, ?)`;
        const values = [
            notificacao.id_cliente,
            notificacao.mensagem,
            notificacao.data_envio
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID da notificação inserida
    }

    // Método para obter todas as notificações
    static async obterTodos() {
        const query = 'SELECT * FROM notificacao';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todas as notificações
    }

    // Método para obter uma notificação pelo ID
    static async obterPorId(id_notificacao) {
        const query = 'SELECT * FROM notificacao WHERE id_notificacao = ?';
        const [rows] = await pool.promise().query(query, [id_notificacao]);
        return rows[0]; // Retorna a notificação encontrada
    }

    // Método para atualizar uma notificação
    static async atualizar(notificacao) {
        const query = `UPDATE notificacao SET id_cliente = ?, mensagem = ?, data_envio = ? 
                       WHERE id_notificacao = ?`;
        const values = [
            notificacao.id_cliente,
            notificacao.mensagem,
            notificacao.data_envio,
            notificacao.id_notificacao
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar uma notificação
    static async deletar(id_notificacao) {
        const query = 'DELETE FROM notificacao WHERE id_notificacao = ?';
        await pool.promise().query(query, [id_notificacao]);
    }
}

module.exports = Notificacao;
