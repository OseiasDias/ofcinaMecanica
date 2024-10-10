const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados
const bcrypt = require('bcryptjs'); // Importa o bcrypt

// Classe para o modelo de Administrador
class Administrador {
    constructor(id_administrador, nome, email, telefone, senha, genero, estado, data_nascimento, foto) {
        this.id_administrador = id_administrador;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha; // Novo campo para senha
        this.genero = genero;
        this.estado = estado;
        this.data_nascimento = data_nascimento;
        this.foto = foto;
    }

    // Método para salvar um administrador no banco de dados
    static async salvar(administrador) {
        const hashedPassword = await bcrypt.hash(administrador.senha, 10); // Faz o hash da senha
        const query = `INSERT INTO administrador (nome, email, telefone, senha, genero, estado, data_nascimento, foto) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            administrador.nome,
            administrador.email,
            administrador.telefone,
            hashedPassword, // Usando a senha hasheada
            administrador.genero,
            administrador.estado,
            administrador.data_nascimento,
            administrador.foto
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do administrador inserido
    }

    // Método para obter todos os administradores
    static async obterTodos() {
        const query = 'SELECT * FROM administrador';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os administradores
    }

    // Método para obter um administrador pelo ID
    static async obterPorId(id_administrador) {
        const query = 'SELECT * FROM administrador WHERE id_administrador = ?';
        const [rows] = await pool.promise().query(query, [id_administrador]);
        return rows[0]; // Retorna o administrador encontrado
    }

    // Método para atualizar um administrador
    static async atualizar(administrador) {
        const values = [
            administrador.nome,
            administrador.email,
            administrador.telefone,
            administrador.genero,
            administrador.estado,
            administrador.data_nascimento,
            administrador.foto
        ];

        // Se a senha estiver sendo atualizada, faça o hash dela
        if (administrador.senha) {
            const hashedPassword = await bcrypt.hash(administrador.senha, 10);
            values.push(hashedPassword); // Atualiza o valor da senha hasheada
        } else {
            values.push(administrador.senha); // Mantém a senha anterior se não for atualizada
        }

        const query = `UPDATE administrador SET nome = ?, email = ?, telefone = ?, genero = ?, estado = ?, 
                       data_nascimento = ?, foto = ?, senha = ? WHERE id_administrador = ?`;
        values.push(administrador.id_administrador); // Adiciona o ID do administrador ao final do array
        await pool.promise().query(query, values);
    }

    // Método para deletar um administrador
    static async deletar(id_administrador) {
        const query = 'DELETE FROM administrador WHERE id_administrador = ?';
        await pool.promise().query(query, [id_administrador]);
    }

    // Método para obter um administrador por email (para login)
    static async obterPorEmail(email) {
        const query = 'SELECT * FROM administrador WHERE email = ?';
        const [rows] = await pool.promise().query(query, [email]);
        return rows[0]; // Retorna o administrador encontrado
    }
}

module.exports = Administrador;
