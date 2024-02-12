const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:');

app.use(cors());

db.serialize(() => {
    db.run("CREATE TABLE marcas (id INTEGER PRIMARY KEY, nome TEXT)");
    db.run("CREATE TABLE produtos (id INTEGER PRIMARY KEY, nome TEXT, marca_id INTEGER, FOREIGN KEY(marca_id) REFERENCES marcas(id))");
    // Inserir algumas marcas
    db.run("INSERT INTO marcas (nome) VALUES (?)", ['Marca A']);
    db.run("INSERT INTO marcas (nome) VALUES (?)", ['Marca B']);
    db.run("INSERT INTO marcas (nome) VALUES (?)", ['Marca C']);

    // Inserir alguns produtos
    db.run("INSERT INTO produtos (nome, marca_id) VALUES (?, ?)", ['Produto 1', 1]);
    db.run("INSERT INTO produtos (nome, marca_id) VALUES (?, ?)", ['Produto 2', 1]);
    db.run("INSERT INTO produtos (nome, marca_id) VALUES (?, ?)", ['Produto 3', 2]);
});

// Middleware para analisar o corpo das solicitações
app.use(bodyParser.json());

// Rotas da API
app.post('/marcas', (req, res) => {
    const { nome } = req.body;
    db.run("INSERT INTO marcas (nome) VALUES (?)", [nome], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

app.post('/produtos', (req, res) => {
    const { nome, marca_id } = req.body;
    db.run("INSERT INTO produtos (nome, marca_id) VALUES (?, ?)", [nome, marca_id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

app.get('/marcas', (req, res) => {
    db.all("SELECT * FROM marcas", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    })
});

app.get('/produtos', (req, res) => {
    db.all("SELECT * FROM produtos", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
