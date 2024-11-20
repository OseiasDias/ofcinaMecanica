const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Pagamento
class Pagamento {
    constructor(id_pagamento, id_agendamento, valor, metodo_pagamento, status) {
        this.id_pagamento = id_pagamento;
        this.id_agendamento = id_agendamento;
        this.valor = valor;
        this.metodo_pagamento = metodo_pagamento;
        this.status = status;
    }

    // Método para salvar um pagamento no banco de dados
    static async salvar(pagamento) {
        const query = `INSERT INTO pagamento (id_agendamento, valor, metodo_pagamento, status) 
                       VALUES (?, ?, ?, ?)`;
        const values = [
            pagamento.id_agendamento,
            pagamento.valor,
            pagamento.metodo_pagamento,
            pagamento.status
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do pagamento inserido
    }

    // Método para obter todos os pagamento
    static async obterTodos() {
        const query = 'SELECT * FROM pagamento';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os pagamento
    }

    // Método para obter um pagamento pelo ID
    static async obterPorId(id_pagamento) {
        const query = 'SELECT * FROM pagamento WHERE id_pagamento = ?';
        const [rows] = await pool.promise().query(query, [id_pagamento]);
        return rows[0]; // Retorna o pagamento encontrado
    }

    // Método para atualizar um pagamento
    static async atualizar(pagamento) {
        const query = `UPDATE pagamento SET id_agendamento = ?, valor = ?, metodo_pagamento = ?, status = ? 
                       WHERE id_pagamento = ?`;
        const values = [
            pagamento.id_agendamento,
            pagamento.valor,
            pagamento.metodo_pagamento,
            pagamento.status,
            pagamento.id_pagamento
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um pagamento
    static async deletar(id_pagamento) {
        const query = 'DELETE FROM pagamento WHERE id_pagamento = ?';
        await pool.promise().query(query, [id_pagamento]);
    }

     // Método para contar todos os blogs
     static async contarTodosPagamentos() {
        try {
          const query = 'SELECT COUNT(*) AS total FROM pagamento';
          const [rows] = await pool.promise().query(query);
          return rows[0].total; // Retorna o número total de linhas
        } catch (error) {
          console.error('Erro ao contar linhas:', error);
          throw error;
        }
    }
}

module.exports = Pagamento;
