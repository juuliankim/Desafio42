const dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer')

class Ethereal {
    constructor() { }

    enviarMailLogIn(email, usuario) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        })
        let mailOptions = {
            from: 'Servidor NodeJS',
            to: email,
            subject: 'Se hizo login a través de Facebook',
            html: `Se detectó que el usuario ${usuario} hizo un login a través de Facebook en la fecha: ` + new Date().toLocaleString,
            attachments: [
                {
                    path: `${foto}`
                }
            ]
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log(info)
        })
    }
    enviarMailLogOut(email, usuario) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.ETHEREAL_USER,
                pass: process.env.ETHEREAL_PASS
            }
        })
        let mailOptions = {
            from: 'Servidor NodeJS',
            to: email,
            subject: 'Se hizo login a través de Facebook',
            html: `Se detectó que el usuario ${usuario} hizo un logout a través de Facebook en la fecha: ` + new Date().toLocaleString,
            attachments: [
                {
                    path: `${foto}`
                }
            ]
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
                return err
            }
            console.log(info)
        })
    }
}

module.exports = new Ethereal()