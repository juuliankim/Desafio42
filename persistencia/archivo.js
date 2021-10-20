const Productos = require('../api/productos')
const fs = require('fs/promises')

class Archivo {

    constructor() {
        this.pathArchivo = '../productos.txt'
    }

    async listar() {
        try {
            let lecturaArchivo = await fs.promises.readFile(this.pathArchivo, 'utf-8')
            let productos = JSON.parse(lecturaArchivo)
            console.log(productos)
            return productos
        } catch {
            console.log([])
            return []
        }
    }

    async guardar(producto) {
        let leidos = await this.leer()
        producto.id = leidos.length + 1
        leidos.push(producto)
        try {
            await fs.promises.writeFile(this.pathArchivo, JSON.stringify(leidos, null, '\t'))
        } catch {
            throw new Error('No se pudo guardar un nuevo producto')
        }
    }

    async actualizar(idProducto, nuevoProducto) {
        try {
            let archivoLeido = await fs.promises.readFile(this.pathArchivo, 'utf-8')
            let archivoActualizado = JSON.parse(archivoLeido)
            archivoActualizado[idProducto] = nuevoProducto
            await fs.promises.writeFile(this.pathArchivo, JSON.stringify(archivoActualizado, null, '\t'))
        } catch {
            throw new Error('No se pudo actualizar el archivo')
        }
    }

    async borrar(idProducto) {
        try {
            let archivoLeido = await fs.promises.readFile(this.pathArchivo, 'utf-8');
            let archivoActualizado = archivoLeido.splice(idProducto, 1)
            await fs.promises.writeFile(this.pathArchivo, JSON.stringify(archivoActualizado, null, '\t'))
        } catch {
            throw new Error('No se pudo eliminar el archivo')
        }
    }
}

module.exports = Archivo