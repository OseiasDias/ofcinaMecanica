const express = require('express');
const ControllerBlog = require('../controllers/ControllerBlog'); // Importa o controller de Blog

const router = express.Router();

// Rota para criar um novo blog
router.post('/', ControllerBlog.criarBlog);

// Rota para obter todos os blogs
router.get('/', ControllerBlog.obterBlogs);

// Rota para obter um blog por ID
router.get('/:id_blog', ControllerBlog.obterBlogPorId);

// Rota para atualizar um blog
router.put('/:id_blog', ControllerBlog.atualizarBlog);

// Rota para deletar um blog
router.delete('/:id_blog', ControllerBlog.deletarBlog);

module.exports = router;
