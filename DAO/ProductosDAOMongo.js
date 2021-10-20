const IProductosDAO = require('./IProductosDAO')
const Producto = require('../models/productos')
const ProductoDTO = require('../DTO/ProductosDTO')

class ProductoMongoDAO extends IProductosDAO {

    constructor() {
        super()
    }

    async listar() {
        let producto = await Producto.find()
        return producto.map(p => new ProductoDTO(p))
    }

    async listarPorId(id) {
        let producto = await Producto.findById(id)
        return new ProductoDTO(producto)
    }

    async guardar(data) {
        return await Producto.create(data)
    }

    async actualizar(id, nuevoProducto) {
        return await Producto.findByIdAndUpdate(id, nuevoProducto)
    }

    async borrar(id) {
        return await Producto.findByIdAndDelete(id)
    }
}

module.exports = new ProductoMongoDAO()