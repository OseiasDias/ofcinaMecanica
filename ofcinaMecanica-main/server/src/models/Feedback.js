const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Feedback
class Feedback {
    constructor(id_feedback, id_cliente, id_servico, comentario, avaliacao) {
        this.id_feedback = id_feedback;
        this.id_cliente = id_cliente;
        this.id_servico = id_servico;
        this.comentario = comentario;
        this.avaliacao = avaliacao;
    }

    // Método para salvar um feedback no banco de dados
    static async salvar(feedback) {
        const query = `INSERT INTO feedback (id_cliente, id_servico, comentario, avaliacao) 
                       VALUES (?, ?, ?, ?)`;
        const values = [
            feedback.id_cliente,
            feedback.id_servico,
            feedback.comentario,
            feedback.avaliacao
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do feedback inserido
    }

    // Método para obter todos os feedbacks
    static async obterTodos() {
        const query = 'SELECT * FROM feedback';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os feedbacks
    }

    // Método para obter um feedback pelo ID
    static async obterPorId(id_feedback) {
        const query = 'SELECT * FROM feedback WHERE id_feedback = ?';
        const [rows] = await pool.promise().query(query, [id_feedback]);
        return rows[0]; // Retorna o feedback encontrado
    }

    // Método para atualizar um feedback
    static async atualizar(feedback) {
        const query = `UPDATE feedback SET id_cliente = ?, id_servico = ?, comentario = ?, avaliacao = ? 
                       WHERE id_feedback = ?`;
        const values = [
            feedback.id_cliente,
            feedback.id_servico,
            feedback.comentario,
            feedback.avaliacao,
            feedback.id_feedback
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um feedback
    static async deletar(id_feedback) {
        const query = 'DELETE FROM feedback WHERE id_feedback = ?';
        await pool.promise().query(query, [id_feedback]);
    }
}

module.exports = Feedback;
