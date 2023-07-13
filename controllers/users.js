const express = require('express')
// const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/users.js')

router.get('/sign-up', (req, res) => {
    res.render('users/sign-up.ejs')
})

router.post('/sign-up', (req, res) => {
    User.findOne({ username: req.body.username }, (err, userExists) => {
        if (userExists) {
            res.send('that username is taken')
        } else {
            User.create(req.body, (err, createdUser) => {
                console.log(createdUser)
                req.session.currentUser = createdUser
                res.redirect('/tasks')
            })
        }
    })
})

router.get('/log-in', (req, res) => {
    res.render('users/log-in.ejs')
})

router.post('/log-in', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (foundUser) {
            if (req.body.password === foundUser.password) {
                req.session.currentUser = foundUser
                console.log(foundUser);
                res.redirect('/tasks')
            } else {
                res.send('Invalid username or password')
            }
        } else {
            res.send('Invalid username or password')
        }
    })
})

router.get('/sign-out', (req, res) => {
    req.session.destroy()
    res.redirect('/home')
})

module.exports = router