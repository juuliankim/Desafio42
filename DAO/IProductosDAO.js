class IProductosDAO {

    constructor() { }

    async listar() {
        throw new DaoException('falta implementar create()')
    }

    async listarPorId(id) {
        throw new DaoException('falta implementar findById()')
    }

    async guardar() {
        throw new DaoException('falta implementar findAll()')
    }

    async actualizar(id, nuevoProducto) {
        throw new DaoException('falta implementar update()')
    }

    async borrar(id) {
        throw new DaoException('falta implementar remove()')
    }
}

module.exports = IProductosDAO