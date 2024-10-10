const express = require("express");
const cors = require("cors");

const ControllerCliente = require('./src/controllers/ControllerCliente');
const ControllerAdministrador = require('./src/controllers/ControllerAdministrador'); 
const ControllerUsuario = require('./src/controllers/ControllerUsuario'); // Importa o controller do usuário
const ControllerAgendamento = require('./src/controllers/ControllerAgendamento'); // Importa o controller do agendamento



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






const PORTA = process.env.PORT || 5000; // Define a porta

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
