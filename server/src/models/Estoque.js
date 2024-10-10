const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Estoque
class Estoque {
    constructor(id_item, nome_peca, quantidade, data_reposicao) {
        this.id_item = id_item;
        this.nome_peca = nome_peca;
        this.quantidade = quantidade;
        this.data_reposicao = data_reposicao;
    }

    // Método para salvar um item no estoque no banco de dados
    static async salvar(item) {
        const query = `INSERT INTO estoque (nome_peca, quantidade, data_reposicao) 
                       VALUES (?, ?, ?)`;
        const values = [
            item.nome_peca,
            item.quantidade,
            item.data_reposicao
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do item inserido
    }

    // Método para obter todos os itens do estoque
    static async obterTodos() {
        const query = 'SELECT * FROM estoque';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os itens do estoque
    }

    // Método para obter um item do estoque pelo ID
    static async obterPorId(id_item) {
        const query = 'SELECT * FROM estoque WHERE id_item = ?';
        const [rows] = await pool.promise().query(query, [id_item]);
        return rows[0]; // Retorna o item encontrado
    }

    // Método para atualizar um item do estoque
    static async atualizar(item) {
        const query = `UPDATE estoque SET nome_peca = ?, quantidade = ?, data_reposicao = ? 
                       WHERE id_item = ?`;
        const values = [
            item.nome_peca,
            item.quantidade,
            item.data_reposicao,
            item.id_item
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um item do estoque
    static async deletar(id_item) {
        const query = 'DELETE FROM estoque WHERE id_item = ?';
        await pool.promise().query(query, [id_item]);
    }
}

module.exports = Estoque;
