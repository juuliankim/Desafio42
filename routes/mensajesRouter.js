require('dotenv').config
const express = require('express')
const router = express.Router()
const Mensajes = require('../api/mensajes')
const log4js = require('log4js')

const loggerConsola = log4js.getLogger('consola')
const loggerWarn = log4js.getLogger('warn')
const loggerError = log4js.getLogger('error')

router.get('/leer', async (req, res) => {
    try {
        let result = await Mensajes.buscar()
        return res.json(result)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.get('/leer/:id', async (req, res) => {
    try {
        let result = await Mensajes.buscarPorId(req.params.id)
        return res.json(result)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.post('/guardar', async (req, res) => {
    try {
        let result = await Mensajes.guardar(req.body)
        return res.json(result)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.put('/actualizar/:id', async (req, res) => {
    try {
        let result = await Mensajes.actualizar(req.params.id, req.body)
        return res.json(result)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

router.delete('/borrar/:id', async (req, res) => {
    try {
        let result = await Mensajes.borrar(req.params.id)
        return res.json(result)
    } catch (error) {
        loggerError.error(error)
        return res.status(500).send({ error: error.message })
    }
})

module.exports = router