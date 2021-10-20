const axios = require('axios');

const URL = 'http://localhost:8080/api/productos'

let nuevoProducto = {
    title: 'Producto Axios',
    price: 20,
    thumbnail: 'axios.jpg'
}
let productoActualizado = {
    title: 'Producto Axios Actualizado',
    price: 50,
    thumbnail: 'axios.jpg'
}
async function getProductos() {
    try {
        let listaProductos = await axios.get(URL + '/listar');
        console.log(listaProductos.data);
        let agregarProducto = await axios.post(URL + '/guardar', nuevoProducto);
        console.log(agregarProducto.data);
        let actualizarProducto = await axios.put(URL + '/actualizar', { title: nuevoProducto.title, nuevoProducto: productoActualizado });
        console.log(actualizarProducto.data);
        let borrarProducto = await axios.delete(URL + '/borrar', { title: productoActualizado.title })
        console.log(borrarProducto.data)
    } catch (error) {
        console.log(error.response.data)
    }
}