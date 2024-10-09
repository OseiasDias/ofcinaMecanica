// index.js
const express = require("express");
const cors = require("cors");

/*const rotasClientes = require("./routes/clientRoutes");
const rotasServicos = require("./routes/serviceRoutes");
const rotasAgendamentos = require("./routes/appointmentRoutes");
const rotasFaturas = require("./routes/invoiceRoutes");
const rotasAutenticacao = require("./routes/authRoutes");*/

const app = express();

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
// (Você pode adicionar sua lógica de conexão com o banco de dados aqui)

// Montar rotas
/*app.use("/api/clientes", rotasClientes);
app.use("/api/servicos", rotasServicos);
app.use("/api/agendamentos", rotasAgendamentos);
app.use("/api/faturas", rotasFaturas);
app.use("/api/auth", rotasAutenticacao);*/

const PORTA = process.env.PORT || 5000; // Definido para a porta 5000

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
