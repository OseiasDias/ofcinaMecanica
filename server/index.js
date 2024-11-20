const express = require("express");
const cors = require("cors");

/* 
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Para gerar tokens aleatórios
    
app.use(express.json());*/
const ControllerEmpresa = require('./src/controllers/ControllerEmpresa'); 
const ControllerFatura = require('./src/controllers/ControllerFatura'); // Importando as rotas de Carros
 
//const ControllerCarro = require('./src/controllers/ControllerCarro'); // Importando as rotas de Carros
const ControllerCliente = require('./src/controllers/ControllerCliente');
const ControllerAdministrador = require('./src/controllers/ControllerAdministrador'); 
const ControllerUsuario = require('./src/controllers/ControllerUsuario'); // Importa o controller do usuário
const ControllerAgendamento = require('./src/controllers/ControllerAgendamento'); // Importa o controller do agendamento
const ControllerBlog = require('./src/controllers/ControllerBlog'); // Importa as rotas de Blog
const ControllerEstoque = require('./src/controllers/ControllerEstoque');
const ControllerFeedback = require('./src/controllers/ControllerFeedback');
const ControllerNotificacao = require('./src/controllers/ControllerNotificacao');
const ControllerPagamento = require('./src/controllers/ControllerPagamento');
const ControllerPromocao = require('./src/controllers/ControllerPromocao');
const ControllerVeiculo = require('./src/controllers/ControllerVeiculo');
const ControllerServico = require('./src/controllers/ControllerServico');

/** ============= Importacoes de routes contadoras do itens em tabela ============= */




//const blogRouter = require('./src/routes/RouteBlog');
const agendamentoRouter = require('./src/routes/RouteAgendamento');
const clientesRouter = require('./src/routes/RouteCliente');
const estoqueRouter = require('./src/routes/RouteEstoque');
const faturaRouter = require('./src/routes/RouteFatura');
const pagamentosRouter = require('./src/routes/RoutePagamento');
const servicoRouter = require('./src/routes/RouteServico');
const usuarioRouter = require('./src/routes/RouterUsuario');
const veiculoRouter = require('./src/routes/RouteVeiculo');
const ControllerHorarios = require("./src/controllers/ControllerHorarios");








/**======== FIM Importacoes de routes contadoras do itens em tabela ========== */




const app = express();
  
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
// (Adicione sua lógica de conexão com o banco de dados aqui)


/*
============================================================
    INSTANCIA DE ROUTER CONTADORAS
============================================================
*/

//app.use('/api', blogRouter);
app.get('/api/blogs/total',ControllerBlog.contarBlogs);
app.get('/api/agendamentos/total',ControllerAgendamento.contarAgendamentos);
app.get('/api/clientes/total',ControllerCliente.contarClientes);
app.get('/api/estoque/total',ControllerEstoque.contarEstoque);
app.get('/api/fatura/total',ControllerFatura.contarFatura);
app.get('/api/pagamento/total',ControllerPagamento.contarPagamentos);
app.get('/api/servico/total',ControllerServico.contarServicos);
app.get('/api/usuario/total',ControllerUsuario.contarUsuarios);
app.get('/api/veiculo/total',ControllerVeiculo.contarVeiculos);




/*
==========================================================
   FIM INSTANCIA DE ROUTER CONTADORAS
===========================================================
*/


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

// Rota para obter um cliente por email
app.get('/api/clientes/email/:email', ControllerCliente.obterClientePorEmail); // Nova rota para obter cliente por email


// Rota para deletar um cliente
app.delete('/api/clientes/:id_cliente', ControllerCliente.deletarCliente);

// Rota para Login Cliente
app.post('/api/clientes/login', ControllerCliente.loginCliente); // Adiciona a rota de login

// Rota para obter o maior id_cliente
app.get('/api/clientes/pegar/maior-id', ControllerCliente.obterMaiorId);

// Rota atualizada para receber novoStatus no corpo da requisição
app.put('/api/clientes/:id_cliente/status', ControllerCliente.atualizarStatus);

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

app.get('/api/administradores/email/:email', ControllerAdministrador.obterAdministradorPorEmail);

// Rota para atualizar um administrador
app.put('/api/administradores/:id_administrador', ControllerAdministrador.atualizarAdministrador);

// Rota para deletar um administrador
app.delete('/api/administradores/:id_administrador', ControllerAdministrador.deletarAdministrador);

// Rota atualizada para receber novoStatus no corpo da requisição
app.put('/api/administradores/:id_administrador/status', ControllerAdministrador.atualizarStatus);

// Rota para fazer login de administrador
app.post('/api/administradores/login', ControllerAdministrador.login);

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

// Rota atualizada para receber novoStatus no corpo da requisição
app.put('/api/usuarios/:id_usuario/status', ControllerUsuario.atualizarStatus);


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


// Rota para obter agendamentos de um cliente específico
app.get('/api/agendamentos/cliente/:id_cliente', ControllerAgendamento.obterAgendamentosPorCliente);


// Rota para atualizar um agendamento
app.put('/api/agendamentos/:id_agendamento', ControllerAgendamento.atualizarAgendamento);

// Rota para deletar um agendamento

app.delete('/api/agendamentos/:id_agendamento', ControllerAgendamento.deletarAgendamento);


// Rota atualizada para receber novoStatus no corpo da requisição
app.put('/api/agendamentos/:id_agendamento/status', ControllerAgendamento.atualizarStatus);


// Rota para adiar o agendamento
app.put('/api/agendamentos/:id_agendamento/adiar', ControllerAgendamento.adiarAgendamento);

app.get('/api/agendamentos/total', ControllerAgendamento.contarAgendamentos);





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

// Rota para deletar um blog
app.get('/api/blogs/total', ControllerBlog.contarBlogs);

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


/*
======================================
        Rotas de Pagamento
======================================
*/
// Rota para criar um novo pagamento
app.post('/api/pagamentos', ControllerPagamento.criarPagamento);

// Rota para obter todos os pagamentos
app.get('/api/pagamentos', ControllerPagamento.obterPagamentos);

// Rota para obter um pagamento por ID
app.get('/api/pagamentos/:id_pagamento', ControllerPagamento.obterPagamentoPorId);

// Rota para atualizar um pagamento
app.put('/api/pagamentos/:id_pagamento', ControllerPagamento.atualizarPagamento);

// Rota para deletar um pagamento
app.delete('/api/pagamentos/:id_pagamento', ControllerPagamento.deletarPagamento);



/*
======================================
        Rotas de Promoção
======================================
*/
// Rota para criar um novo promoção
app.post('/api/promocoes', ControllerPromocao.criarPromocao);

// Rota para obter todas as promoções
app.get('/api/promocoes', ControllerPromocao.obterPromocoes);

// Rota para obter uma promoção por ID
app.get('/api/promocoes/:id_promocao', ControllerPromocao.obterPromocaoPorId);

// Rota para atualizar uma promoção
app.put('/api/promocoes/:id_promocao', ControllerPromocao.atualizarPromocao);

// Rota para deletar uma promoção
app.delete('/api/promocoes/:id_promocao', ControllerPromocao.deletarPromocao);



/*
======================================
           Rotas de Serviço
======================================
*/

// Rota para criar um novo serviço
app.post('/api/servicos', ControllerServico.criarServico);

// Rota para obter todos os serviços
app.get('/api/servicos', ControllerServico.obterServicos);

// Rota para obter um serviço por ID
app.get('/api/servicos/:id_servico', ControllerServico.obterServicoPorId);

// Rota para atualizar um serviço
app.put('/api/servicos/:id_servico', ControllerServico.atualizarServico);

// Rota para deletar um serviço
app.delete('/api/servicos/:id_servico', ControllerServico.deletarServico);





/*
======================================
          Rotas do Carros
======================================


// Rota para criar um novo carro
app.post('/api/carros', ControllerCarro.adicionar); // Rota para adicionar um carro

// Rota para obter todos os carros
app.get('/api/carros', ControllerCarro.obterTodos); // Rota para obter todos os carros

// Rota para obter um carro por ID
app.get('/api/carros/:id_carro', ControllerCarro.obterPorId); // Rota para obter um carro por ID

// Rota para obter carros de um cliente específico (corrigida)
app.get('/api/carros/cliente/:id_cliente', ControllerCarro.obterCarrosPorCliente); // Rota corrigida para retornar os carros de um cliente específico

// Rota para atualizar um carro
app.put('/api/carros/:id_carro', ControllerCarro.atualizar); // Rota para atualizar um carro

// Rota para deletar um carro
app.delete('/api/carros/:id_carro', ControllerCarro.excluir); // Rota para deletar um carro
*/






/*
======================================
           Rotas de Veículo
======================================
*/

// Rota para criar um novo veículo
app.post('/api/veiculos', ControllerVeiculo.criarVeiculo);

// Rota para obter todos os veículos
app.get('/api/veiculos', ControllerVeiculo.obterVeiculos);

// Rota para obter um veículo por ID
app.get('/api/veiculos/:id_veiculo', ControllerVeiculo.obterVeiculoPorId);

// Rota para atualizar um veículo
app.put('/api/veiculos/:id_veiculo', ControllerVeiculo.atualizarVeiculo);

// Rota para obter veículos por ID do cliente
app.get('/api/veiculos/cliente/:id_cliente', ControllerVeiculo.obterVeiculosPorIdCliente);

// Rota para deletar um veículo
app.delete('/api/veiculos/:id_veiculo', ControllerVeiculo.deletarVeiculo);



/*
======================================
           Rotas de Fatura
======================================
*/



app.post('/api/faturas/', ControllerFatura.criarFatura);

app.get('/api/faturas/', ControllerFatura.obterFaturas);


app.get('/api/faturas/:id_fatura', ControllerFatura.obterFaturaPorId);

app.put('/api/faturas/:id_fatura', ControllerFatura.atualizarFatura);

app.delete('/api/faturas/:id_fatura', ControllerFatura.deletarFatura);

app.get('/api/faturas/status/:status_pagamento', ControllerFatura.obterFaturasPorStatus);



/*
======================================
           Rotas de Fatura
======================================
*/



// Rota para obter todos os blogs
app.get('/api/empresas', ControllerEmpresa.obterEmpresas); 
app.get('/api/empresas/:id_empresa', ControllerEmpresa.obterEmpresaPorId);
app.put('/api/empresas/:id_empresa', ControllerEmpresa.atualizarEmpresa);





app.get('/api/horarios', ControllerHorarios.obterHorarios);

app.get('/api/horarios/:empresa_id/:dia', ControllerHorarios.obterHorariosPorEmpresaDia);










/*
/*

// Configurações para envio de email usando nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Pode usar outro serviço de e-mail
  auth: {
    user: 'seu-email@gmail.com',
    pass: 'sua-senha-de-app' // Use a senha de app (não a senha do e-mail pessoal)
  }
});

// Endpoint para solicitar a alteração de senha
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  // Gera um código de verificação (pode ser um número ou token)
  const verificationCode = crypto.randomInt(100000, 999999); // Código numérico de 6 dígitos

  // Armazene o código em um banco de dados ou cache, associado ao usuário
  // Exemplo: `await storeVerificationCode(email, verificationCode)`

  // Enviar o código por e-mail para o usuário
  const mailOptions = {
    from: 'seu-email@gmail.com',
    to: email,
    subject: 'Seu código de verificação',
    text: `Seu código de verificação é ${verificationCode}.`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Código de verificação enviado!');
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
    res.status(500).send('Erro ao enviar o e-mail.');
  }
});

// Endpoint para verificar o código e alterar a senha
app.post('/verify-code', async (req, res) => {
  const { email, code, newPassword } = req.body;

  // Verifique se o código está correto e associado ao e-mail
  // Exemplo: `const isValid = await verifyCode(email, code)`
  const isValid = true; // Implementar a lógica de verificação

  if (!isValid) {
    return res.status(400).send('Código inválido ou expirado.');
  }

  // Atualize a senha do usuário no banco de dados
  // Exemplo: `await updatePassword(email, newPassword)`

  res.status(200).send('Senha alterada com sucesso!');
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

*/
/*
Ja encontradooooooooooooooooooooooooo

*/


const PORTA = process.env.PORT || 5000; // Define a porta

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
