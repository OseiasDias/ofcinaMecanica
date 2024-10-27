const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Veiculo
class Veiculo {
    constructor(id_veiculo, marca, modelo, ano, placa, id_cliente, fotos, status_reparacao) {
        this.id_veiculo = id_veiculo;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.id_cliente = id_cliente;
        this.fotos = fotos;
        this.status_reparacao = status_reparacao;
    }

    // Método para salvar um veículo no banco de dados
    static async salvar(veiculo) {
        const query = `INSERT INTO veiculo (marca, modelo, ano, placa, id_cliente, fotos, status_reparacao) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            veiculo.marca,
            veiculo.modelo,
            veiculo.ano,
            veiculo.placa,
            veiculo.id_cliente,
            veiculo.fotos,
            veiculo.status_reparacao
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do veículo inserido
    }

    // Método para obter todos os veículos
    static async obterTodos() {
        const query = 'SELECT * FROM veiculo';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os veículos
    }

    // Método para obter um veículo pelo ID
    static async obterPorId(id_veiculo) {
        const query = 'SELECT * FROM veiculo WHERE id_veiculo = ?';
        const [rows] = await pool.promise().query(query, [id_veiculo]);
        return rows[0]; // Retorna o veículo encontrado
    }

     // Método para obter veículos por ID do cliente
     static async obterPorIdCliente(id_cliente) {
        const query = 'SELECT * FROM veiculo WHERE id_cliente = ?';
        const [rows] = await pool.promise().query(query, [id_cliente]);
        return rows; // Retorna todos os veículos do cliente
    }

    // Método para atualizar um veículo
    static async atualizar(veiculo) {
        const query = `UPDATE veiculo SET marca = ?, modelo = ?, ano = ?, placa = ?, 
                       id_cliente = ?, fotos = ?, status_reparacao = ? 
                       WHERE id_veiculo = ?`;
        const values = [
            veiculo.marca,
            veiculo.modelo,
            veiculo.ano,
            veiculo.placa,
            veiculo.id_cliente,
            veiculo.fotos,
            veiculo.status_reparacao,
            veiculo.id_veiculo
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um veículo
    static async deletar(id_veiculo) {
        const query = 'DELETE FROM veiculo WHERE id_veiculo = ?';
        await pool.promise().query(query, [id_veiculo]);
    }
}

module.exports = Veiculo;
