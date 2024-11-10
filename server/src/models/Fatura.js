const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Fatura
class Fatura {
    constructor(
        id_fatura, 
        nome_cliente, 
        email_cliente, 
        telefone_cliente, 
        genero_cliente, 
        marca_veiculo, 
        modelo_veiculo, 
        ano_veiculo, 
        placa_veiculo, 
        forma_pagamento, 
        valor_desconto, 
        valor_total, 
        data_emissao, 
        status_pagamento
    ) {
        this.id_fatura = id_fatura;
        this.nome_cliente = nome_cliente;
        this.email_cliente = email_cliente;
        this.telefone_cliente = telefone_cliente;
        this.genero_cliente = genero_cliente;
        this.marca_veiculo = marca_veiculo;
        this.modelo_veiculo = modelo_veiculo;
        this.ano_veiculo = ano_veiculo;
        this.placa_veiculo = placa_veiculo;
        this.forma_pagamento = forma_pagamento;
        this.valor_desconto = valor_desconto || 0.00; // Valor do desconto pode ser nulo, então assume 0.00 por padrão
        this.valor_total = valor_total;
        this.data_emissao = data_emissao || new Date(); // Usa a data atual caso não seja fornecida
        this.status_pagamento = status_pagamento || 'Pendente'; // Status padrão é 'Pendente'
    }

    // Método para salvar uma nova fatura no banco de dados
    static async salvar(fatura) {
        const query = `INSERT INTO fatura (nome_cliente, email_cliente, telefone_cliente, genero_cliente, 
                       marca_veiculo, modelo_veiculo, ano_veiculo, placa_veiculo, forma_pagamento, 
                       valor_desconto, valor_total, data_emissao, status_pagamento) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            fatura.nome_cliente,
            fatura.email_cliente,
            fatura.telefone_cliente,
            fatura.genero_cliente,
            fatura.marca_veiculo,
            fatura.modelo_veiculo,
            fatura.ano_veiculo,
            fatura.placa_veiculo,
            fatura.forma_pagamento,
            fatura.valor_desconto,
            fatura.valor_total,
            fatura.data_emissao,
            fatura.status_pagamento
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID da fatura inserida
    }

    // Método para obter todas as faturas
    static async obterTodos() {
        const query = 'SELECT * FROM fatura';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todas as faturas
    }

    // Método para obter uma fatura pelo ID
    static async obterPorId(id_fatura) {
        const query = 'SELECT * FROM fatura WHERE id_fatura = ?';
        const [rows] = await pool.promise().query(query, [id_fatura]);
        return rows[0]; // Retorna a fatura encontrada
    }

    // Método para atualizar uma fatura
    static async atualizar(fatura) {
        const query = `UPDATE fatura SET nome_cliente = ?, email_cliente = ?, telefone_cliente = ?, 
                       genero_cliente = ?, marca_veiculo = ?, modelo_veiculo = ?, ano_veiculo = ?, 
                       placa_veiculo = ?, forma_pagamento = ?, valor_desconto = ?, valor_total = ?, 
                       data_emissao = ?, status_pagamento = ? WHERE id_fatura = ?`;

        const values = [
            fatura.nome_cliente,
            fatura.email_cliente,
            fatura.telefone_cliente,
            fatura.genero_cliente,
            fatura.marca_veiculo,
            fatura.modelo_veiculo,
            fatura.ano_veiculo,
            fatura.placa_veiculo,
            fatura.forma_pagamento,
            fatura.valor_desconto,
            fatura.valor_total,
            fatura.data_emissao,
            fatura.status_pagamento,
            fatura.id_fatura // Inclui o ID no final dos valores
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar uma fatura
    static async deletar(id_fatura) {
        const query = 'DELETE FROM fatura WHERE id_fatura = ?';
        await pool.promise().query(query, [id_fatura]);
    }

    // Método para buscar faturas por status de pagamento
    static async obterPorStatus(status_pagamento) {
        const query = 'SELECT * FROM fatura WHERE status_pagamento = ?';
        const [rows] = await pool.promise().query(query, [status_pagamento]);
        return rows; // Retorna as faturas encontradas com o status especificado
    }
}

module.exports = Fatura;
