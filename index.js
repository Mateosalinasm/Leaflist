const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const schedule = require('node-schedule')
const calendar = require('./controllers/calendar.js')
const tasksController = require('./controllers/tasks.js')
const usersController = require('./controllers/users.js')
const methodOverride = require('method-override')
require('dotenv').config()
const path = require('path');
// const dayjs = require('dayjs')
const session = require('express-session')
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3005

//Session
const SESSION_SECRET = process.env.SESSION_SECRET
console.log(SESSION_SECRET);
// const someDate = new Date('2023-03-16T23:05:00.000')
// schedule.scheduleJob(someDate, () => {
//     console.log('Job ran @', new Date().toString());
// })

// const mJob = schedule.scheduleJob('m-job','*/1 * * * * *', () => {
//     console.log('I ran...');
// })

// const dayJsObject = dayjs()
// console.log(dayJsObject.format("h:mm A"));

app.use(session ({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))


//Middleware
app.set('views', path.join(__dirname, 'views'));
mongoose.set('strictQuery', false)
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(methodOverride('_method'))
app.use('/tasks', tasksController)
app.use('/users', usersController)
app.use(calendar)

//Connect to MongoDB
mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection
db.on('error', err => console.log(err.message))
db.on('connected', () => console.log('MongoDB Connected'));
db.on('disconnected', () => console.log('MongoDB Disconnected'));

//Home Page route
app.get('/', (req, res) => {
    console.log('Home page route handler accessed');
    res.render('home.ejs')
})

//No User route
app.get('/no-user', (req, res) => {
    res.render('no-user.ejs')
})

//Calendar route
// app.get('/calendar', (req, res) => {
//     res.render('calendar.ejs')
// })


app.listen(PORT, (req, res) => {
    console.log('listening on port on', PORT)
})