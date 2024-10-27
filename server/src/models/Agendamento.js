const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Agendamento
class Agendamento {
    constructor(id_agendamento, data, id_cliente, id_veiculo, id_servico, status, descricao) {
        this.id_agendamento = id_agendamento;
        this.data = data;
        this.id_cliente = id_cliente;
        this.id_veiculo = id_veiculo;
        this.id_servico = id_servico;
        this.status = status;
        this.descricao = descricao; // Adiciona o campo descricao
    }

    // Método para salvar um agendamento no banco de dados
   // Método para salvar um agendamento no banco de dados
   static async salvar(agendamento) {
    const query = `INSERT INTO agendamento (data, id_cliente, id_veiculo, id_servico, status, descricao) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
        agendamento.data,
        agendamento.id_cliente,
        agendamento.id_veiculo,
        agendamento.id_servico,
        agendamento.status,
        agendamento.descricao // Adiciona o campo descricao ao salvar
    ];

    const [result] = await pool.promise().query(query, values);
    return result.insertId; // Retorna o ID do agendamento inserido
}

    // Método para obter todos os agendamentos
    static async obterTodos() {
        const query = 'SELECT * FROM agendamento';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os agendamentos
    }

    // Método para obter um agendamento pelo ID
    static async obterPorId(id_agendamento) {
        const query = 'SELECT * FROM agendamento WHERE id_agendamento = ?';
        const [rows] = await pool.promise().query(query, [id_agendamento]);
        return rows[0]; // Retorna o agendamento encontrado
    }


    // Método para obter agendamentos filtrados pelo ID do cliente
    static async obterPorCliente(id_cliente) {
        const query = 'SELECT * FROM agendamento WHERE id_cliente = ?';
        const [rows] = await pool.promise().query(query, [id_cliente]);
        return rows; // Retorna todos os agendamentos encontrados para o cliente
    }

    static async atualizar(agendamento) {
        const query = `UPDATE agendamento SET data = ?, id_cliente = ?, id_veiculo = ?, id_servico = ?, status = ?, descricao = ? 
                       WHERE id_agendamento = ?`;
        const values = [
            agendamento.data,
            agendamento.id_cliente,
            agendamento.id_veiculo,
            agendamento.id_servico,
            agendamento.status,
            agendamento.descricao, // Adiciona o campo descricao na atualização
            agendamento.id_agendamento
        ];

        await pool.promise().query(query, values);
    }


    // Método para deletar um agendamento
    static async deletar(id_agendamento) {
        const query = 'DELETE FROM agendamento WHERE id_agendamento = ?';
        await pool.promise().query(query, [id_agendamento]);
    }
}

module.exports = Agendamento;
