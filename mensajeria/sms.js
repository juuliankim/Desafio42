const dotenv = require('dotenv')
dotenv.config()

let accountSid = process.env.SMS_SID || 'ACee4b3a7272396e74ad07bbf6d8317aa2'
let authToken = process.env.SMS_TOKEN || '0466654b4a06c0194df8659257abd949'

const client = require('twilio')(accountSid, authToken)

class Sms {
    constructor() { }

    enviarSMS(usuario, texto) {
        client.messages.create({
            body: `${usuario} mencionó a un administrador en el siguiente mensaje: ${texto}`,
            from: '+18509405912',
            to: process.env.SMS_NUMERO
        })
            .then(message => console.log(message.sid))
            .catch(console.log)

    }
}

module.exports = new Sms()