const express = require('express')
const app = express()
const mongoose = require('mongoose')
const tasksController = require('./controllers/tasks.js')
const Task = require('./models/tasks.js')
const methodOverride = require('method-override')
require('dotenv').config()
const path = require('path');

const PORT = process.env.PORT || 3005


//Middleware
mongoose.set('strictQuery', false)
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use('/tasks', tasksController)
app.use(express.json())

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', err => console.log(err.message))
db.on('connected', () => console.log('MongoDB Connected'));
db.on('disconnected', () => console.log('MongoDB Disconnected'));

//Home Page route
app.get('/home', (req, res) => {
    res.render('home.ejs')
})

app.listen(PORT, (req, res) => {
    console.log('listening on port on', PORT)
})