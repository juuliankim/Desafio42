var { buildSchema } = require('graphql')

var schema = buildSchema(`
    type Query {
        buscar: [Producto],
    },
    type Mutation {
        actualizarProducto(_id: String, title:String, price: String, thumbnail: String) : Producto ,
    },
    type Producto {
        _id: String,
        title: String,
        price: String,
        thumbnail: String
    }
`)

module.exports = {schema}