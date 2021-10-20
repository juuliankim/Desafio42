const options = require('../config/mariaDBdatabase')
const knex = require('knex')(options)

class MySql {

    constructor() {
        this.producto,
            this.crearTabla()
    }

    async crearTabla() {
        try {
            console.log('Borrando tabla existente...')
            await knex.schema.dropTable('productos')

            await knex.schema.createTable('productos', table => {
                table.string('title')
                table.integer('price')
                table.string('thumbnail')
                table.integer('id')
            })
            console.log('Tabla productos creada!')
        } catch (error) {
            console.log(error)
        }
    }

    async listar() {
        await knex.from('productos').select('*')
            .then(rows => {
                console.log(rows)
            }).catch(error => {
                console.log('Error:', error)
            })
        return this.producto
    }

    async guardar(productos) {
        try {
            await knex('productos').insert(productos)
        }
        catch (error) {
            console.log(error)
        }
        this.producto.push(productos)
    }

    async actualizar(idProducto, nuevoProducto) {
        this.producto[idProducto] = nuevoProducto
        await knex.from('productos').where('id', `${idProducto}`).update(nuevoProducto)
            .then(() => {
                console.log('Producto actualizado')
            }).catch(error => {
                console.log('Error:', error)
            })
    }

    async borrar(idProducto) {
        console.log(idProducto)
        await knex.from('productos').where('id', '=', `${idProducto}`).del()
            .then(() => {
                console.log('Producto eliminado')
            }).catch(error => {
                console.log('Error:', error)
            })
        let productoBorrado = this.producto.splice(idProducto, 1)
        return productoBorrado
    }
}

module.exports = MySql