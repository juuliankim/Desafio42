require('dotenv').config()
const express = require('express')
const router = express.Router()
const productos = require('../api/productos')
const log4js = require('log4js')
var { graphqlHTTP } = require('express-graphql')
const { schema } = require('../models/productosGraphQL').schema
const SingletonFactory = require('../factory')
let singletonFactory = SingletonFactory.getInstancia()
let instanciaFactory = singletonFactory.getPersistencia('mysql')
const env = require('../config/config')

const loggerError = log4js.getLogger('error')

router.get('/listar', async (req, res) => {
    try {
        let result = await instanciaFactory.listar()
        return res.json(result)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.get('/listar/:id', async (req, res) => {
    try {
        let mensajeLista = await instanciaFactory.listarPorId(req.params.id)
        res.json(mensajeLista)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.post('/guardar', async (req, res) => {
    try {
        let nuevoProducto = {}
        nuevoProducto.title = req.body.title
        nuevoProducto.price = req.body.price
        nuevoProducto.thumbnail = req.body.thumbnail
        await instanciaFactory.guardar(nuevoProducto)
        res.json(nuevoProducto)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.put('/actualizar/:id', async (req, res) => {
    try {
        let nuevoProducto = await instanciaFactory.actualizar(req.params.id, req.body)
        res.json(nuevoProducto)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.put('/actualizar', async (req, res) => {
    try {
        let productoActualizado = await instanciaFactory.actualizarPorNombre(req.body.title, req.body.nuevoProducto)
        res.json(productoActualizado)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.delete('/borrar/:id', async (req, res) => {
    try {
        let productoBorrado = await instanciaFactory.borrar(req.params.id)
        return res.json(productoBorrado)
    } catch(error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.delete('/borrar', async (req, res) => {
    try {
        let productoBorrado = await instanciaFactory.borrarPorNombre(req.body.title)
        return res.json(productoBorrado)
    } catch(error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})


const buscar = async function() {
    return await instanciaFactory.listar()
}

const actualizar = async function(nuevoProducto) {
    console.log(JSON.stringify(nuevoProducto))
    return await instanciaFactory.actualizar(nuevoProducto._id, nuevoProducto)
}

var root = {
    buscar: buscar,
    actualizarProducto: actualizar,
}

router.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphql: env.GRAPHIQL
}))

module.exports = router