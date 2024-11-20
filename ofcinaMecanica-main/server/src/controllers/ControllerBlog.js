const Blog = require('../models/Blog'); // Importa o modelo Blog

class ControllerBlog {
    // Método para criar um novo blog
    static async criarBlog(req, res) {
        try {
            const { titulo, conteudo, data_publicacao } = req.body;
            const blog = new Blog(null, titulo, conteudo, data_publicacao);
            const id = await Blog.salvar(blog);
            res.status(201).json({ id, message: 'Blog criado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar blog' });
        }
    } 

    // Método para obter todos os blogs
    static async obterBlogs(req, res) {
        try {
            const blogs = await Blog.obterTodos();
            res.status(200).json(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter blogs' });
        }
    }

    // Método para obter um blog por ID
    static async obterBlogPorId(req, res) {
        try {
            const { id_blog } = req.params;
            const blog = await Blog.obterPorId(id_blog);
            if (blog) {
                res.status(200).json(blog);
            } else {
                res.status(404).json({ message: 'Blog não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao obter blog' });
        }
    }

    // Método para atualizar um blog
    static async atualizarBlog(req, res) {
        try {
            const { id_blog } = req.params;
            const { titulo, conteudo, data_publicacao } = req.body;
            const blog = new Blog(id_blog, titulo, conteudo, data_publicacao);
            await Blog.atualizar(blog);
            res.status(200).json({ message: 'Blog atualizado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar blog' });
        }
    }

    // Método para deletar um blog
    static async deletarBlog(req, res) {
        try {
            const { id_blog } = req.params;
            await Blog.deletar(id_blog);
            res.status(200).json({ message: 'Blog deletado com sucesso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao deletar blog' });
        }
    }

    static async contarBlogs(req, res) {
        try {
          const totalBlogs = await Blog.contarTodos();
          res.status(200).json({ total: totalBlogs });
        } catch (error) {
          console.error('Erro ao contar blogs:', error);
          res.status(500).json({ message: 'Erro ao contar blogs' });
        }
      }
}

module.exports = ControllerBlog;
