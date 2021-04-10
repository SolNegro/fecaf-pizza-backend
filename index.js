const express = require('express')
const config = require('config')
const pg = require('pg')
const { response } = require('express')
const port = process.env.PORT || config.get("server.port")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const listaPedidos = []
const pool = new pg.Pool ({
    connectionString: "postgres://zwgrdipbywmvkk:3f1c63b292a130d8047468bf20e54cd285dc4bc7b47530f2317e9b05b3d353f8@ec2-54-164-241-193.compute-1.amazonaws.com:5432/da6ufsvtl3eev7",
    ssl: {
        rejectUnauthorized: false
    }
})

app.route('/reset').get((req, res) => { 
    let qry = "DROP TABLE IF EXISTS pedidos;"
    qry+= "CREATE TABLE pedidos ("
    qry+= "cliente char(100),"
    qry+= "sabor char(50),"
    qry+= "quantidade int,"
    qry+= "tamanho char(25)"
    qry+= ");"
    pool.query(qry, (err, dbres) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send("Banco de dados resetado")
        }
    })
})

app.route('/pedidos').get((req, res) => {
    console.log("/pedidos acionado")
    let qry = "SELECT * FROM pedidos;"
    pool.query(qry, (err, dbres) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(dbres.rows)
        }
    });
})

app.route('/pedido/adicionar').post((req, res) => {
    console.log("/pedido/adicionar acionado")
    let qry = "INSERT INTO pedidos (cliente, sabor, quantidade, tamanho)"
    qry += ` VALUES ('${req.body.cliente}', '${req.body.sabor}', ${req.body.quantidade}, '${res.body.tamanho}'); `
    pool.query(qry, (err, dbres) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send("Pedido adicionado com sucesso")
        }
    });
})

app.listen(port, () => {
    console.log("Iniciando o servidor na porta ", port)
})

console.log("Inicio do projeto")