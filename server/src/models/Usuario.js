const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados
const bcrypt = require('bcryptjs'); // Importa o bcrypt

// Classe para o modelo de Usuario
class Usuario {
    constructor(id_usuario, nome, email, telefone, senha, nivel_acesso, genero, data_nascimento, foto, estado, endereco) {
        this.id_usuario = id_usuario;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha; // Campo para senha
        this.nivel_acesso = nivel_acesso; // Novo campo para nível de acesso
        this.genero = genero;
        this.data_nascimento = data_nascimento;
        this.foto = foto;
        this.estado = estado;
        this.endereco = endereco; // Novo campo para o endereço
    }

    // Método para salvar um usuário no banco de dados
    static async salvar(usuario) {
        const hashedPassword = await bcrypt.hash(usuario.senha, 10); // Faz o hash da senha
        const query = `INSERT INTO usuario (nome, email, telefone, senha, nivel_acesso, genero, data_nascimento, foto, estado, endereco) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            usuario.nome,
            usuario.email,
            usuario.telefone,
            hashedPassword, // Usando a senha hasheada
            usuario.nivel_acesso,
            usuario.genero,
            usuario.data_nascimento,
            usuario.foto,
            usuario.estado,
            usuario.endereco // Adiciona o campo endereço aqui
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do usuário inserido
    }

    // Método para obter todos os usuários
    static async obterTodos() {
        const query = 'SELECT * FROM usuario';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os usuários
    }

    // Método para obter um usuário pelo ID
    static async obterPorId(id_usuario) {
        const query = 'SELECT * FROM usuario WHERE id_usuario = ?';
        const [rows] = await pool.promise().query(query, [id_usuario]);
        return rows[0]; // Retorna o usuário encontrado
    }

    // Método para atualizar um usuário
    static async atualizar(usuario) {
        const values = [
            usuario.nome,
            usuario.email,
            usuario.telefone,
            usuario.nivel_acesso,
            usuario.genero,
            usuario.data_nascimento,
            usuario.foto,
            usuario.estado,
            usuario.endereco // Atualiza o campo endereço também
        ];

        // Se a senha estiver sendo atualizada, faça o hash dela
        if (usuario.senha) {
            const hashedPassword = await bcrypt.hash(usuario.senha, 10);
            values.push(hashedPassword); // Atualiza o valor da senha hasheada
        } else {
            values.push(usuario.senha); // Mantém a senha anterior se não for atualizada
        }

        const query = `UPDATE usuario SET nome = ?, email = ?, telefone = ?, nivel_acesso = ?, genero = ?, 
                       data_nascimento = ?, foto = ?, estado = ?, endereco = ?, senha = ? WHERE id_usuario = ?`;
        values.push(usuario.id_usuario); // Adiciona o ID do usuário ao final do array
        await pool.promise().query(query, values);
    }

    // Método para deletar um usuário
    static async deletar(id_usuario) {
        const query = 'DELETE FROM usuario WHERE id_usuario = ?';
        await pool.promise().query(query, [id_usuario]);
    }

    // Método para obter um usuário por email (para login)
    static async obterPorEmail(email) {
        const query = 'SELECT * FROM usuario WHERE email = ?';
        const [rows] = await pool.promise().query(query, [email]);
        return rows[0]; // Retorna o usuário encontrado
    }
}

module.exports = Usuario;
