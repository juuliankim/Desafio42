const dotenv = require('dotenv')
const path = require('path')

console.log(path.resolve(process.cwd(), process.env.NODE_ENV + '.env'))

dotenv.config({
    path: path.resolve(_dirname, process.env.NODE_ENV + '.env')
})

module.exports = {
    NODE_ENV = process.env.NODE_ENV || 'development',
    PROVIDER = process.env.PROVIDER || 'memory',
    PORT = process.env.PORT || 8080,
    GRAPHIQL = process.env.PORT || 'true',
    FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || '661357575265865',
    FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || '8da38b5b928766d9001e9861cd0b0d0e',
    MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce'
}