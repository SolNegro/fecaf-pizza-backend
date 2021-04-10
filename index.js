const express = require('express')
const config = require('config')
const port = process.env.PORT || config.get("server.port")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const listaPedidos = []

app.route('/pedidos').get((req, res) => {
    console.log("/pedidos acionado")
    res.status(200).json(listaPedidos)
})

app.route('/pedidos/adicionar').post((req, res) => {
    console.log("Headers =>", req.headers)
    console.log("Query =>", req.query)
    console.log("Body =>", req.body)
    listaPedidos.push(req.body)
    res.status(200).send("Pedido adicionado com sucesso")
})

app.listen(port, () => {
    console.log("Iniciando o servidor na porta ", port)
})

console.log("Inicio do projeto")