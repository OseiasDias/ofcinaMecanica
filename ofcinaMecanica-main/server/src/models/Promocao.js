const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Promoção
class Promocao {
    constructor(id_promocao, descricao, data_inicio, data_fim, desconto) {
        this.id_promocao = id_promocao;
        this.descricao = descricao;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.desconto = desconto;
    }

    // Método para salvar uma promoção no banco de dados
    static async salvar(promocao) {
        const query = `INSERT INTO promocao (descricao, data_inicio, data_fim, desconto) 
                       VALUES (?, ?, ?, ?)`;
        const values = [
            promocao.descricao,
            promocao.data_inicio,
            promocao.data_fim,
            promocao.desconto
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID da promoção inserida
    }

    // Método para obter todas as promoções
    static async obterTodas() {
        const query = 'SELECT * FROM promocao';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todas as promoções
    }

    // Método para obter uma promoção pelo ID
    static async obterPorId(id_promocao) {
        const query = 'SELECT * FROM promocao WHERE id_promocao = ?';
        const [rows] = await pool.promise().query(query, [id_promocao]);
        return rows[0]; // Retorna a promoção encontrada
    }

    // Método para atualizar uma promoção
    static async atualizar(promocao) {
        const query = `UPDATE promocao SET descricao = ?, data_inicio = ?, data_fim = ?, desconto = ? 
                       WHERE id_promocao = ?`;
        const values = [
            promocao.descricao,
            promocao.data_inicio,
            promocao.data_fim,
            promocao.desconto,
            promocao.id_promocao
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar uma promoção
    static async deletar(id_promocao) {
        const query = 'DELETE FROM promocao WHERE id_promocao = ?';
        await pool.promise().query(query, [id_promocao]);
    }
}

module.exports = Promocao;
