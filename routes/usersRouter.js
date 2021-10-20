require('dotenv').config()
const express = require('express')
const router = express.Router()
const passport = require('passport')
const Ethereal = require('../mensajeria/ethereal')
const Sms = require('../mensajeria/sms')

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/callback', passport.authenticate('facebook',
    {
        successRedirect: '/login',
        failureRedirect: '/faillogin'
    }
))

router.get('/login', (req, res) => {

    Ethereal.enviarMailLogIn(req.user.email, req.user.name)

    res.render('vista', {
        showLogin: false,
        showContent: true,
        bienvenida: req.user.name,
        email: req.user.email,
        urlImg: req.user.picture.data.url,
        showBienvenida: true
    })
})

router.get('/faillogin', (req, res) => {
    res.sendFile(__dirname + '/public/failLogin.html')
})

router.get('/logout', (req, res) => {
    Ethereal.enviarMailLogOut(req.user.email, req.user.name)
    req.logout();
    res.sendFile(__dirname + '/public/logout.html')
})

module.exports = router