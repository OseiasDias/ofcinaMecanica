const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados
const bcrypt = require('bcryptjs'); // Importa o bcrypt

// Classe para o modelo de Administrador
class Administrador {
    constructor(id_administrador, nome, email, telefone, senha, genero, estado, data_nascimento, foto, isSuperAdmin) {
        this.id_administrador = id_administrador;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha; // Novo campo para senha
        this.genero = genero;
        this.estado = estado;
        this.data_nascimento = data_nascimento;
        this.foto = foto;
        this.isSuperAdmin = isSuperAdmin;
    }

    // Método para salvar um administrador no banco de dados
    static async salvar(administrador) {
        const hashedPassword = await bcrypt.hash(administrador.senha, 10); // Faz o hash da senha
        const query = `INSERT INTO administrador (nome, email, telefone, senha, genero, estado, data_nascimento, foto,isSuperAdmin) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            administrador.nome,
            administrador.email,
            administrador.telefone,
            hashedPassword, // Usando a senha hasheada
            administrador.genero,
            administrador.estado,
            administrador.data_nascimento,
            administrador.foto,
            administrador.isSuperAdmin
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
            administrador.foto,
            administrador.isSuperAdmin
        ];

        // Se a senha estiver sendo atualizada, faça o hash dela
        if (administrador.senha) {
            const hashedPassword = await bcrypt.hash(administrador.senha, 10);
            values.push(hashedPassword); // Atualiza o valor da senha hasheada
        } else {
            values.push(administrador.senha); // Mantém a senha anterior se não for atualizada
        }

        const query = `UPDATE administrador SET nome = ?, email = ?, telefone = ?, genero = ?, estado = ?, 
                       data_nascimento = ?, foto = ?, senha = ?, isSuperAdmin = ? WHERE id_administrador = ?`;
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


    // Método para atualizar o status de administrador
    static async atualizarSuperAdmin(id_administrador, novoStatus) {
        // Verifica se o novoStatus é válido (0 ou 1)
        if (![0, 1].includes(novoStatus)) {
            throw new Error("Status inválido. Deve ser 0 (não é administrador) ou 1 (é administrador).");
        }

        // Query para atualizar o campo 'isSuperAdmin' no banco de dados
        const query = `UPDATE administrador SET estado = ? WHERE id_administrador = ?`;
        const values = [novoStatus, id_administrador];

        // Executa a consulta
        const [result] = await pool.promise().query(query, values);

        // Se não houverem linhas afetadas, significa que o administrador não foi encontrado
        if (result.affectedRows === 0) {
            throw new Error('Administrador não encontrado');
        }

        return { message: 'Status de Administrador atualizado com sucesso!' };
    }

}

module.exports = Administrador;
