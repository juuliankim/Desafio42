let instancia = null

class FactoryPersistencias {

    constructor() { }

    getPersistencia(tipo) {
        try {
            let modulo = require(`./persistencia/${tipo}`)
            return modulo
        } catch (error) {
            console.log(`No se encontro el tipo de persistencia: ${tipo}`)
        }
    }

    static getInstancia() {
        if (!instancia) {
            instancia = new FactoryPersistencias()
        }
        return instancia
    }
}

module.exports = FactoryPersistencias