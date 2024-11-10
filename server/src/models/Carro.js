const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

class Carro {
    constructor(id_veiculo, marca, modelo, ano, placa, id_cliente, fotos, status_reparacao) {
        this.id_veiculo = id_veiculo;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.id_cliente = id_cliente;
        this.fotos = fotos ? JSON.stringify(fotos) : null;  // Garantir que fotos sejam sempre um JSON
        this.status_reparacao = status_reparacao;
    }

    // Método para salvar um carro no banco de dados
    static async salvar(carro) {
        const query = `INSERT INTO carros (marca, modelo, ano, placa, id_cliente, fotos, status_reparacao)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.id_cliente,
            carro.fotos,
            carro.status_reparacao
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do carro inserido
    }

    // Método para obter todos os carros
    static async obterTodos() {
        const query = 'SELECT * FROM carros';
        const [rows] = await pool.promise().query(query);
        return rows;
    }

    // Método para obter um carro pelo ID
    static async obterPorId(id_veiculo) {
        const query = 'SELECT * FROM carros WHERE id_veiculo = ?';
        const [rows] = await pool.promise().query(query, [id_veiculo]);
        return rows[0];
    }

    // Método para obter todos os carros de um cliente
    static async obterPorIdCliente(id_cliente) {
        const query = 'SELECT * FROM carros WHERE id_cliente = ?';
        const [rows] = await pool.promise().query(query, [id_cliente]);
        return rows;
    }

    // Método para atualizar um carro
    static async atualizar(carro) {
        const query = `UPDATE carros 
                       SET marca = ?, modelo = ?, ano = ?, placa = ?, id_cliente = ?, fotos = ?, status_reparacao = ?
                       WHERE id_veiculo = ?`;
        const values = [
            carro.marca,
            carro.modelo,
            carro.ano,
            carro.placa,
            carro.id_cliente,
            carro.fotos,
            carro.status_reparacao,
            carro.id_veiculo
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um carro
    static async deletar(id_veiculo) {
        const query = 'DELETE FROM carros WHERE id_veiculo = ?';
        await pool.promise().query(query, [id_veiculo]);
    }

    // Método para obter um carro por placa
    static async obterPorPlaca(placa) {
        const query = 'SELECT * FROM carros WHERE placa = ?';
        const [rows] = await pool.promise().query(query, [placa]);
        return rows[0];
    }

    // Método para obter o maior id_veiculo
    static async obterMaiorId() {
        const query = 'SELECT MAX(id_veiculo) AS maior_id FROM carros';
        const [rows] = await pool.promise().query(query);
        return rows[0].maior_id;
    }
}

module.exports = Carro;
