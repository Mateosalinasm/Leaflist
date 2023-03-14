const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/users.js')

router.get('/sign-up', (req, res) => {
    res.render('users/sign-up.ejs')
})

router.post('/sign-up', (req, res) => {
    const salt = 10
    console.log(typeof req.body.password, typeof '10')
    
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    User.findOne({username: req.body.username}, (err, userExists) => {
        if(userExists) {
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
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if(validLogin) {
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