const pool = require('../db/Conexao'); // Importa a conexão com o banco de dados

// Classe para o modelo de Blog
class Blog {
    constructor(id_blog, titulo, conteudo, data_publicacao) {
        this.id_blog = id_blog;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.data_publicacao = data_publicacao;
    }

    // Método para salvar um blog no banco de dados
    static async salvar(blog) {
        const query = `INSERT INTO blog (titulo, conteudo, data_publicacao) 
                       VALUES (?, ?, ?)`;
        const values = [
            blog.titulo,
            blog.conteudo,
            blog.data_publicacao
        ];

        const [result] = await pool.promise().query(query, values);
        return result.insertId; // Retorna o ID do blog inserido
    }

    // Método para obter todos os blogs
    static async obterTodos() {
        const query = 'SELECT * FROM blog';
        const [rows] = await pool.promise().query(query);
        return rows; // Retorna todos os blogs
    }

    // Método para obter um blog pelo ID
    static async obterPorId(id_blog) {
        const query = 'SELECT * FROM blog WHERE id_blog = ?';
        const [rows] = await pool.promise().query(query, [id_blog]);
        return rows[0]; // Retorna o blog encontrado
    }

    // Método para atualizar um blog
    static async atualizar(blog) {
        const query = `UPDATE blog SET titulo = ?, conteudo = ?, data_publicacao = ? 
                       WHERE id_blog = ?`;
        const values = [
            blog.titulo,
            blog.conteudo,
            blog.data_publicacao,
            blog.id_blog
        ];

        await pool.promise().query(query, values);
    }

    // Método para deletar um blog
    static async deletar(id_blog) {
        const query = 'DELETE FROM blog WHERE id_blog = ?';
        await pool.promise().query(query, [id_blog]);
    }
}

module.exports = Blog;
