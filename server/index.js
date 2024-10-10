const express = require("express");
const cors = require("cors");

const ControllerCliente = require('./src/controllers/ControllerCliente');
const ControllerAdministrador = require('./src/controllers/ControllerAdministrador'); 
const ControllerUsuario = require('./src/controllers/ControllerUsuario'); // Importa o controller do usuário
const ControllerAgendamento = require('./src/controllers/ControllerAgendamento'); // Importa o controller do agendamento
const ControllerBlog = require('./src/controllers/ControllerBlog'); // Importa as rotas de Blog
const ControllerEstoque = require('./src/controllers/ControllerEstoque');
const ControllerFeedback = require('./src/controllers/ControllerFeedback');
const ControllerNotificacao = require('./src/controllers/ControllerNotificacao');


const app = express();

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
// (Adicione sua lógica de conexão com o banco de dados aqui)

/*
======================================
            Rotas do Cliente
======================================
*/
// Rota para criar um novo cliente
app.post('/api/clientes', ControllerCliente.criarCliente);

// Rota para obter todos os clientes
app.get('/api/clientes', ControllerCliente.obterClientes);

// Rota para obter um cliente por ID
app.get('/api/clientes/:id_cliente', ControllerCliente.obterClientePorId);

// Rota para atualizar um cliente
app.put('/api/clientes/:id_cliente', ControllerCliente.atualizarCliente);

// Rota para deletar um cliente
app.delete('/api/clientes/:id_cliente', ControllerCliente.deletarCliente);

/*
======================================
        Rotas do Administrador
======================================
*/
// Rota para criar um novo administrador
app.post('/api/administradores', ControllerAdministrador.criarAdministrador);

// Rota para obter todos os administradores
app.get('/api/administradores', ControllerAdministrador.obterAdministradores);

// Rota para obter um administrador por ID
app.get('/api/administradores/:id_administrador', ControllerAdministrador.obterAdministradorPorId);

// Rota para atualizar um administrador
app.put('/api/administradores/:id_administrador', ControllerAdministrador.atualizarAdministrador);

// Rota para deletar um administrador
app.delete('/api/administradores/:id_administrador', ControllerAdministrador.deletarAdministrador);

/*
======================================
           Rotas do Usuário
======================================
*/
// Rota para criar um novo usuário
app.post('/api/usuarios', ControllerUsuario.criarUsuario);

// Rota para obter todos os usuários
app.get('/api/usuarios', ControllerUsuario.obterUsuarios);

// Rota para obter um usuário por ID
app.get('/api/usuarios/:id_usuario', ControllerUsuario.obterUsuarioPorId);

// Rota para atualizar um usuário
app.put('/api/usuarios/:id_usuario', ControllerUsuario.atualizarUsuario);

// Rota para deletar um usuário
app.delete('/api/usuarios/:id_usuario', ControllerUsuario.deletarUsuario);

// Rota para obter um usuário por email (para login)
app.get('/api/usuarios/email/:email', ControllerUsuario.obterUsuarioPorEmail);

/*
======================================
          Rotas do Agendamento
======================================
*/
// Rota para criar um novo agendamento
app.post('/api/agendamentos', ControllerAgendamento.criarAgendamento);

// Rota para obter todos os agendamentos
app.get('/api/agendamentos', ControllerAgendamento.obterAgendamentos);

// Rota para obter um agendamento por ID
app.get('/api/agendamentos/:id_agendamento', ControllerAgendamento.obterAgendamentoPorId);

// Rota para atualizar um agendamento
app.put('/api/agendamentos/:id_agendamento', ControllerAgendamento.atualizarAgendamento);

// Rota para deletar um agendamento

app.delete('/api/agendamentos/:id_agendamento', ControllerAgendamento.deletarAgendamento);


/*
======================================
           Rotas do Blog
======================================
*/
// Rota para criar um novo blog
app.post('/api/blogs', ControllerBlog.criarBlog);

// Rota para obter todos os blogs
app.get('/api/blogs', ControllerBlog.obterBlogs);

// Rota para obter um blog por ID
app.get('/api/blogs/:id_blog', ControllerBlog.obterBlogPorId);

// Rota para atualizar um blog
app.put('/api/blogs/:id_blog', ControllerBlog.atualizarBlog);

// Rota para deletar um blog
app.delete('/api/blogs/:id_blog', ControllerBlog.deletarBlog);


/*
======================================
           Rotas do Estoque
======================================
*/
// Rota para criar um novo item no estoque
app.post('/api/estoque', ControllerEstoque.criarItem);

// Rota para obter todos os itens do estoque
app.get('/api/estoque', ControllerEstoque.obterItens);

// Rota para obter um item do estoque por ID
app.get('/api/estoque/:id_item', ControllerEstoque.obterItemPorId);

// Rota para atualizar um item no estoque
app.put('/api/estoque/:id_item', ControllerEstoque.atualizarItem);

// Rota para deletar um item do estoque
app.delete('/api/estoque/:id_item', ControllerEstoque.deletarItem);



/*
======================================
           Rotas de Feedback
======================================
*/
// Rota para criar um novo feedback
app.post('/api/feedbacks', ControllerFeedback.criarFeedback);

// Rota para obter todos os feedbacks
app.get('/api/feedbacks', ControllerFeedback.obterFeedbacks);

// Rota para obter um feedback por ID
app.get('/api/feedbacks/:id_feedback', ControllerFeedback.obterFeedbackPorId);

// Rota para atualizar um feedback
app.put('/api/feedbacks/:id_feedback', ControllerFeedback.atualizarFeedback);

// Rota para deletar um feedback
app.delete('/api/feedbacks/:id_feedback', ControllerFeedback.deletarFeedback);


/*
======================================
        Rotas de Notificação
======================================
*/
// Rota para criar uma nova notificação
app.post('/api/notificacoes', ControllerNotificacao.criarNotificacao);

// Rota para obter todas as notificações
app.get('/api/notificacoes', ControllerNotificacao.obterNotificacoes);

// Rota para obter uma notificação por ID
app.get('/api/notificacoes/:id_notificacao', ControllerNotificacao.obterNotificacaoPorId);

// Rota para atualizar uma notificação
app.put('/api/notificacoes/:id_notificacao', ControllerNotificacao.atualizarNotificacao);

// Rota para deletar uma notificação
app.delete('/api/notificacoes/:id_notificacao', ControllerNotificacao.deletarNotificacao);



const PORTA = process.env.PORT || 5000; // Define a porta

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
