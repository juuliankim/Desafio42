class DAOFactory {

    static getPersistencia(tipo) {
        try {
            const persistencia = require(`./ProductosDAO${tipo}`) // Elegir entre File o Mongo
            return persistencia
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
}

module.exports = DAOFactory