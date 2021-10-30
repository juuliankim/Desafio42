const dotenv = require('dotenv')
const path = require('path')

console.log(path.resolve(process.cwd(), process.env.NODE_ENV + '.env'))

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
})

module.exports.NODE_ENV = process.env.NODE_ENV || 'development',
module.exports.PROVIDER = process.env.PROVIDER || 'memory',
module.exports.PORT = process.env.PORT || 8080,
module.exports.GRAPHIQL = process.env.PORT || 'true',
module.exports.FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || '661357575265865',
module.exports.FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || '8da38b5b928766d9001e9861cd0b0d0e',
module.exports.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce'