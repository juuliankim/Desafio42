class ProductoDTO {

    constructor(productoData) {
        this.idMongo = productoData._id
        this.id = productoData.id
        this.title = productoData.title
        this.price = productoData.price
        this.thumbnail = productoData.thumbnail
        this.timestamp = new Date().toLocaleString()
    }

    getIdMongo() {
        return this.idMongo
    }

    getId() {
        return this.Id
    }

    getNombre() {
        return this.title
    }

    getPrecio() {
        return this.price
    }

    getThumbnail() {
        return this.thumbnail
    }
}

module.exports = ProductoDTO