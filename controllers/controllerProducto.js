const DAOFactory = require('../DAO/DAOFactory')
const config = require('../config/config.json')

class ControllerProductos {

    constructor() {
        this.productoDao = DAOFactory.getPersistencia(config.PERSISTENCIA)
    }

    async listar() {
        return await this.productoDao.listar()
    }
 
    async guardar(data) {
        return await this.productoDao.guardar(data)
    }

    async listarPorId(id) {
        let article = await this.productoDao.listarPorId(id)
        console.log('>>> ID', article.getId())
        return article
    }

    async actualizar(id, data) {
        return await this.productoDao.actualizar(id, data)
    }

    async borrar(id) {
        return await this.productoDao.borrar(id)
    }
}

module.exports = new ControllerProductos()