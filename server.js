const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const productos = require('./api/productos')
const Mensajes = require('./api/mensajes')
const handlebars = require('express-handlebars')
const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)
const normalize = require('normalizr').normalize
const schema = require('normalizr').schema
const session = require('express-session')
const cluster = require('cluster')
const { fork } = require('child_process')
const numCPUs = require('os').cpus().length
const compression = require('compression')
const Sms = require('./mensajeria/sms')
const log4js = require("log4js")
const env = require('./config/config')

const loggerConsola = log4js.getLogger('consola')
const loggerWarn = log4js.getLogger('warn')
const loggerError = log4js.getLogger('error')

require('./database/connection')

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const modoCluster = process.argv[3] == 'cluster'

if(modoCluster && cluster.isMaster) {
    for(let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'murio', new Date().toLocaleString())
        cluster.fork()
    })
} else {
    app.get('/info', (req, res) => {
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
}

app.use(express.static('public'))

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts'
}))

app.set("view engine", "hbs")
app.set("views", "./views")

app.use('/api', productosRouter)
app.use('/api', mensajesRouter)
app.use('/api', usersRouter)
app.use('/api', infoRouter)
const productosRouter = require('./routes/productosRouter')
const mensajesRouter = require('./routes/mensajesRouter')
const usersRouter = require('./routes/usersRouter')
const infoRouter = require('./routes/infoRouter')

app.use((err, req, res, next) =>{
    console.error(err.message)
    return res.status(500).send('Algo se rompió!!')
})

io.on('connection', async socket => {
    console.log('Usuario conectado')

    socket.on('nuevo-producto', nuevoProducto => {
        console.log(nuevoProducto)
        productos.guardar(nuevoProducto)
    })
    socket.emit('guardar-productos', () => {
        socket.on('notificacion', data => {
            console.log(data)
        })
    })

    socket.on("new-message", async function (data) {
        
        Sms.enviarSMS(data.autor.alias, data.texto)

        await Mensajes.guardar(data)

        let mensajesDB = await Mensajes.buscarTodo()     

        const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'nombre' });

        const mensajeSchema = new schema.Entity('texto', {
            autor: autorSchema
        }, { idAttribute: '_id' })

        const mensajesSchema = new schema.Entity('mensajes', {
            msjs: [mensajeSchema]
        }, {idAttribute: 'id'})

        const mensajesNormalizados = normalize(mensajesDB, mensajesSchema)
        const messages = []
        messages.push(mensajesDB);

        console.log(mensajesDB)

        console.log(mensajesNormalizados)
            
        io.sockets.emit("messages", mensajesNormalizados)
    })
})

let PORT = env.PORT
if (process.argv[2] && !isNaN(process.argv[2])) {
    PORT = process.argv[2]
} else if (isNaN(process.argv[2])) {
    loggerWarn.warn('No se ingresó un puerto válido, se usará el 8080') 
    PORT = 8080
}

const svr = server.listen(PORT, () => {
    loggerConsola.info(process.argv)
    loggerConsola.info(`servidor escuchando en http://localhost:${PORT}`)
})

server.on('error', error => {
    loggerError.error('error en el servidor:', error)
})