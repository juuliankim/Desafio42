require('dotenv').config()
const express = require('express')
const router = express.Router()
const log4js = require('log4js')

const loggerConsola = log4js.getLogger('consola')
const loggerWarn = log4js.getLogger('warn')
const loggerError = log4js.getLogger('error')

router.get('/info', (req, res) => {
    let informacion = {}
    informacion['Argumentos de entrada:'] = `${process.argv[2]} ${process.argv[3]} ${process.argv[4]} ${process.argv[5]}`
    informacion['Nombre de plataforma:'] = process.platform
    informacion['Version de Node:'] = process.version
    informacion['Uso de memoria:'] = process.memoryUsage()
    informacion['Path de ejecucion:'] = process.execPath
    informacion['Process id:'] = process.pid
    informacion['Carpeta corriente:'] = process.cwd()
    informacion['Numero de procesadores'] = numCPUs
    informacion['Puerto'] = process.argv[2]
    res.send(JSON.stringify(informacion, null, 4))
})

router.get('/random', (req, res) => {
    const numeroRandom = fork('./api/numeroRandom.js')
    let cantidad = 0
    if (req.query.cant & !isNaN(req.query.cant)) {
        cantidad = req.query.cant
    } else if (isNaN(req.query.cant)) {
        loggerError.error('No se ingresó un número en la ruta /random')
        res.send('Error:No se ingresó un número')
    } else {
        cantidad = 100000000
    }
    numeroRandom.send((cantidad).toString())
    numeroRandom.on("message", obj => {
        res.end(JSON.stringify(obj, null, 3))
    })
})

module.exports = router