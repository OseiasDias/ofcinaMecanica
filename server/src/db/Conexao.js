// database/connection.js
const mysql2 = require("mysql2");

// Usa uma flag para alternar entre configurações de localhost e servidor
const useLocalhost = true; // Defina como true para localhost ou false para servidor

let connectionParams;

if (useLocalhost) {
    console.log("Conectando ao banco de dados local");
    connectionParams = {
        user: "root",          // Usuário do banco de dados local
        host: "localhost",     // Host do banco de dados local
        password: "",          // Senha do banco de dados local
        database: "oficina",   // Nome do banco de dados
    };
} else {
    connectionParams = {
        user: "seu_usuario",   // Substitua pelo seu usuário do banco na Hostinger
        host: "seu_host",      // Substitua pelo host do banco na Hostinger
        password: "sua_senha", // Substitua pela sua senha do banco na Hostinger
        database: "oficina",    // Nome do banco de dados
    };
}

// Cria um pool de conexões
const pool = mysql2.createPool(connectionParams);

pool.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conexão com o banco de dados estabelecida.");
        connection.release(); // Libera a conexão de volta ao pool
    }
});

// Exporta o pool
module.exports = pool;
