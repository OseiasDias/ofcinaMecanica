const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

class Horarios {
    constructor(id, empresa_id, dia, abertura, fechamento) {
        this.id = id;
        this.empresa_id = empresa_id;
        this.dia = dia;
        this.abertura = abertura;
        this.fechamento = fechamento;
    }

    // Método para salvar o horário no banco de dados
    static async salvar(horario) {
        const query = `INSERT INTO horarios (empresa_id, dia, abertura, fechamento) 
                       VALUES (?, ?, ?, ?)`;
        const values = [
            horario.empresa_id,
            horario.dia,
            horario.abertura,
            horario.fechamento
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do horário inserido
    }

    // Método para obter todos os horários
    static async obterTodos() {
        const query = 'SELECT * FROM horarios ORDER BY empresa_id, dia';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os horários ordenados por empresa e dia
    }

    // Método para obter horários de uma empresa por dia
    static async obterPorEmpresaDia(empresa_id, dia) {
        const query = 'SELECT * FROM horarios WHERE empresa_id = ? AND dia = ?';
        const [rows] = await pool.promise().query(query, [empresa_id, dia]);
        return rows; // Retorna os horários encontrados para a empresa e dia especificados
    }

    // Método para atualizar um horário
    static async atualizar(horario) {
        const query = `UPDATE horarios SET empresa_id = ?, dia = ?, abertura = ?, fechamento = ? 
                       WHERE id = ?`;
        const values = [
            horario.empresa_id,
            horario.dia,
            horario.abertura,
            horario.fechamento,
            horario.id
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um horário
    static async deletar(id) {
        const query = 'DELETE FROM horarios WHERE id = ?';
        await pool.promise().query(query, [id]);
    }

    // Método para contar todos os horários
    static async contarTodos() {
        const query = 'SELECT COUNT(*) AS total FROM horarios';
        const [rows] = await pool.promise().query(query);
        return rows[0].total; // Retorna o número total de horários
    }
}

module.exports = Horarios;
