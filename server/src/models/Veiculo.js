const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Veiculo
class Veiculo {
    constructor(id_veiculo, marca, modelo, ano, placa, id_cliente, fotos, status_reparacao,analise_diagnostica,motivo_visita) {
        this.id_veiculo = id_veiculo;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.id_cliente = id_cliente;
        this.fotos = fotos;
        this.status_reparacao = status_reparacao;
        this.analise_diagnostica = analise_diagnostica;
        this.motivo_visita = motivo_visita;
    }

    // Método para salvar um veículo no banco de dados
    static async salvar(veiculo) {
        const query = `INSERT INTO veiculo (marca, modelo, ano, placa, id_cliente, fotos, status_reparacao,analise_diagnostica,motivo_visita) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            veiculo.marca,
            veiculo.modelo,
            veiculo.ano,
            veiculo.placa,
            veiculo.id_cliente,
            veiculo.fotos,
            veiculo.status_reparacao,
            veiculo.analise_diagnostica,
            veiculo.motivo_visita
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
                       id_cliente = ?, fotos = ?, status_reparacao = ?, analise_diagnostica = ?, motivo_visita = ? 
                       WHERE id_veiculo = ?`;
        const values = [
            veiculo.marca,
            veiculo.modelo,
            veiculo.ano,
            veiculo.placa,
            veiculo.id_cliente,
            veiculo.fotos,
            veiculo.status_reparacao, 
            veiculo.id_veiculo,
            veiculo.analise_diagnostica,
            veiculo.motivo_visita
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um veículo
    static async deletar(id_veiculo) {
        const query = 'DELETE FROM veiculo WHERE id_veiculo = ?';
        await pool.promise().query(query, [id_veiculo]);
    }

    static async contarTodosVeiculos() {
        try {
          const query = 'SELECT COUNT(*) AS total FROM veiculo';
          const [rows] = await pool.promise().query(query);
          return rows[0].total; // Retorna o número total de linhas
        } catch (error) {
          console.error('Erro ao contar linhas:', error);
          throw error;
        }
    }
}

module.exports = Veiculo;
