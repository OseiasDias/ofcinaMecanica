const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados
const bcrypt = require('bcryptjs'); // Importa o bcrypt

// Classe para o modelo de Cliente
class Cliente {
    constructor(id_cliente, nome, email, telefone, endereco, genero, data_nascimento, historico_atendimentos, foto, estado, senha) {
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
        this.senha = senha; // Novo campo
    }

    // Método para salvar um cliente no banco de dados
    static async salvar(cliente) {
        const hashedPassword = await bcrypt.hash(cliente.senha, 10); // Faz o hash da senha
        const query = `INSERT INTO cliente (nome, email, telefone, endereco, genero, data_nascimento, historico_atendimentos, foto, estado, senha) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
            hashedPassword // Usando a senha hasheada
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do cliente inserido
    }

    // Método para obter todos os clientes
    static async obterTodos() {
        const query = 'SELECT * FROM cliente';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os clientes
    }

    // Método para obter um cliente pelo ID
    static async obterPorId(id_cliente) {
        const query = 'SELECT * FROM cliente WHERE id_cliente = ?';
        const [rows] = await pool.promise().query(query, [id_cliente]);
        return rows[0]; // Retorna o cliente encontrado
    }

    // Método para atualizar um cliente
    static async atualizar(cliente) {
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
        ];

        // Se a senha estiver sendo atualizada, faça o hash dela
        if (cliente.senha) {
            const hashedPassword = await bcrypt.hash(cliente.senha, 10);
            values.push(hashedPassword); // Atualiza o valor da senha hasheada
        } else {
            values.push(cliente.senha); // Mantém a senha anterior se não for atualizada
        }

        const query = `UPDATE cliente SET nome = ?, email = ?, telefone = ?, endereco = ?, genero = ?, 
                       data_nascimento = ?, historico_atendimentos = ?, foto = ?, estado = ?, senha = ? 
                       WHERE id_cliente = ?`;
        values.push(cliente.id_cliente); // Adiciona o ID do cliente ao final do array
        await pool.promise().query(query, values);
    }

    // Método para deletar um cliente
    static async deletar(id_cliente) {
        const query = 'DELETE FROM cliente WHERE id_cliente = ?';
        await pool.promise().query(query, [id_cliente]);
    }

    // Método para obter um cliente por email (para login)
    static async obterPorEmail(email) {
        const query = 'SELECT * FROM cliente WHERE email = ?';
        const [rows] = await pool.promise().query(query, [email]);
        return rows[0]; // Retorna o cliente encontrado
    }


    // Método para obter um cliente por email (para login)
    static async obterPorEmail(email) {
        const query = 'SELECT * FROM cliente WHERE email = ?';
        const [rows] = await pool.promise().query(query, [email]);
        return rows[0]; // Retorna o cliente encontrado
    }

    // Método para obter o maior id_cliente
    static async obterMaiorId() {
        const query = 'SELECT MAX(id_cliente) AS maior_id FROM cliente';
        const [rows] = await pool.promise().query(query);
        return rows[0].maior_id; // Retorna o maior id_cliente encontrado
    }

    // Método para fazer login com email e senha
    static async login(email, senha) {
        const cliente = await this.obterPorEmail(email); // Obtém o cliente pelo e-mail
        if (!cliente) {
            throw new Error('E-mail ou senha inválidos'); // E-mail não encontrado
        }
        const isPasswordValid = await bcrypt.compare(senha, cliente.senha); // Compara a senha fornecida com a senha armazenada
        if (!isPasswordValid) {
            throw new Error('E-mail ou senha inválidos'); // Senha não corresponde
        }
        return cliente; // Retorna o cliente se o login for bem-sucedido
    }



    // Método para atualizar o status de um cliente
    // Método para atualizar o status de um cliente
static async atualizarStatus(id_cliente, novoStatus) {
    // Verifica se o novoStatus é válido (0 ou 1)
    if (![0, 1].includes(novoStatus)) {
        throw new Error("Status inválido. Deve ser 'Confirmado' ou 'Cancelado'.");
    }

    // Query para atualizar o status no banco de dados
    const query = `UPDATE cliente SET estado = ? WHERE id_cliente = ?`;
    const values = [novoStatus, id_cliente];

    // Executa a consulta
    const [result] = await pool.promise().query(query, values);

    // Se não houverem linhas afetadas, significa que o cliente não foi encontrado
    if (result.affectedRows === 0) {
        throw new Error('Cliente não encontrado');
    }

    return { message: 'Status atualizado com sucesso!' };
}


}

module.exports = Cliente;
