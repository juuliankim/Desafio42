const minimist = require('minimist')
const controllerProductos = require('./controllers/controllerProducto')
require('./database/connection')

async function ejecutarCMDs() {
    const argv = minimist(process.argv.slice(2))
    const { cmd, id, title, price, thumbnail } = argv

    try {
        switch (cmd.toLowerCase()) {
            case 'listar':
                console.log(cmd)
                console.log(await controllerProductos.listar())
                break

            case 'guardar':
                console.log(cmd)
                console.log(await controllerProductos.guardar({ title, price, thumbnail }))
                break

            case 'actualizar':
                console.log(cmd)
                console.log(await controllerProductos.actualizar(id, { title, price, thumbnail }))
                break

            case 'borrar':
                console.log(cmd)
                console.log(await controllerProductos.borrar(id))
                break

            default:
                console.log('comando no valido: ' + cmd)
        }
    } catch (err) {
        console.log(err)
    }
}

ejecutarCMDs()