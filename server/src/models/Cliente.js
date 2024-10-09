// models/clientModel.js
const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Cliente
class Cliente {
    constructor(id_cliente, nome, email, telefone, endereco, genero, data_nascimento, historico_atendimentos, foto, estado) {
        this.id_cliente = id_cliente;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.genero = genero;
        this.data_nascimento = data_nascimento;
        this.historico_atendimentos = historico_atendimentos;
        this.foto = foto;
        this.estado = estado;
    }

    // Método para salvar um cliente no banco de dados
    static async salvar(cliente) {
        const query = `INSERT INTO clientes (nome, email, telefone, endereco, genero, data_nascimento, historico_atendimentos, foto, estado) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.endereco,
            cliente.genero,
            cliente.data_nascimento,
            cliente.historico_atendimentos,
            cliente.foto,
            cliente.estado
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do cliente inserido
    }

    // Método para obter todos os clientes
    static async obterTodos() {
        const query = 'SELECT * FROM clientes';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os clientes
    }

    // Método para obter um cliente pelo ID
    static async obterPorId(id_cliente) {
        const query = 'SELECT * FROM clientes WHERE id_cliente = ?';
        const [rows] = await pool.promise().query(query, [id_cliente]);
        return rows[0]; // Retorna o cliente encontrado
    }

    // Método para atualizar um cliente
    static async atualizar(cliente) {
        const query = `UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ?, genero = ?, 
                       data_nascimento = ?, historico_atendimentos = ?, foto = ?, estado = ? 
                       WHERE id_cliente = ?`;
        const values = [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.endereco,
            cliente.genero,
            cliente.data_nascimento,
            cliente.historico_atendimentos,
            cliente.foto,
            cliente.estado,
            cliente.id_cliente
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um cliente
    static async deletar(id_cliente) {
        const query = 'DELETE FROM clientes WHERE id_cliente = ?';
        await pool.promise().query(query, [id_cliente]);
    }
}

module.exports = Cliente;
