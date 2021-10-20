const IProductosDAO = require('./IProductosDAO')
const ProductoDTO = require('../DTO/ProductosDTO')

class ProductoFileDAO extends IProductosDAO {

    constructor() {
        super()
    }

    async listar() {
        try {
            let lecturaArchivo = await fs.promises.readFile(this.pathArchivo, 'utf-8')
            let productos = JSON.parse(lecturaArchivo)
            return productos
        } catch {
            console.log([])
            return []
        }
    }

    async listarPorId(id) {
        try {
            let listaProductos = await fs.promises.readFile(this.pathArchivo, 'utf-8')
            let productos = JSON.parse(listaProductos)
            return productos[id]
        } catch {
            throw new Error('No se pudo encontrar el archivo')
        }
    }

    async guardar(producto) {
        let leidos = await this.listar()
        producto.id = leidos.length + 1
        leidos.push(producto)
        try {
            await fs.promises.writeFile(this.pathArchivo, JSON.stringify(leidos, null, '\t'))
        } catch {
            throw new Error('No se pudo guardar un nuevo producto')
        }
    }

    async actualizar(id, nuevoProducto) {
        try {
            let archivoLeido = await fs.promises.readFile(this.pathArchivo, 'utf-8')
            let archivoActualizado = JSON.parse(archivoLeido)
            archivoActualizado[id] = nuevoProducto
            await fs.promises.writeFile(this.pathArchivo, JSON.stringify(archivoActualizado, null, '\t'))
        } catch {
            throw new Error('No se pudo actualizar el archivo')
        }
    }

    async borrar(id) {
        try {
            let archivoLeido = await fs.promises.readFile(this.pathArchivo, 'utf-8')
            let archivoActualizado = archivoLeido.splice(idProducto, 1)
            await fs.promises.writeFile(this.pathArchivo, JSON.stringify(archivoActualizado, null, '\t'))
        } catch {
            throw new Error('No se pudo eliminar el archivo')
        }
    }
}

module.exports = ProductoFileDAO

