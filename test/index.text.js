const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect

describe("Test de api productos", () => {
    describe('Peticion de GET - listar productos', () => {
        it('debería retornar el status 200', async () => {
            let response = await request.get('/api/productos/listar')
            expect(response.body[0]).to.have.property('title')
            expect(response.body[0]).to.have.property('price')
            expect(response.body[0]).to.have.property('thumbnail')
            expect(response.status).to.eql(200)
        })
    })
    describe('Peticion de POST - agregar producto', () => {
        it('debería agregar un producto', async () => {
            let producto = {
                title: 'Producto inventado',
                price: 123,
                thumbnail: 'test.jpg'
            }

            let response = await request.post('/api/productos/guardar').send(producto)
            expect(response.body).to.have.property('title')
            expect(response.body).to.have.property('price')
            expect(response.body).to.have.property('thumbnail')
            expect(response.status).to.eql(200)
        })
    })
    describe('Peticion de PUT - actualizar producto', () => {
        it('debería actualizar un producto', async () => {
            let producto = {
                title: 'Update',
                price: 321,
                thumbnail: 'test.jpg'
            }

            let response = await request.put('/api/productos/actualizar/5741c587324f022dd1fb22').send(producto)
            expect(response.body).to.have.property('title')
            expect(response.body).to.have.property('price')
            expect(response.body).to.have.property('thumbnail')
            expect(response.status).to.eql(200)
        })
    })
    describe('Peticion de DELETE - borrar producto', () => {
        it('debería eliminar un producto', async () => {
            let response = await request.delete('/api/productos/borrar/5741c587324f022dd1fb22')
            console.log(response.body)
            if (response.body) {
                expect(response.body).to.have.property('title')
                expect(response.body).to.have.property('price')
                expect(response.body).to.have.property('thumbnail')
                expect(response.status).to.eql(200)

            } else {
                expect(response.status).to.eql(200)
            }
        })
    })
})