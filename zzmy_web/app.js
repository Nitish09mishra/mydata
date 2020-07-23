const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const studentRouter = require('./src/routers/student')
require('./src/db/mongoose')

// initializing express app...
const app = express()

//setting path to express configurations
const publicDir = path.join(__dirname, '/public')
const partialsPath = path.join(__dirname, '/templates/partials')
const viewsPath = path.join(__dirname, '/templates/views')

// setup handlebar and views location...
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)


// setting up static directory to server...
app.use(express.static(publicDir))

app.use(express.urlencoded({ extended: false}))
app.use('/',studentRouter)

// defining ruters...
app.get('', (req, res) => {
    res.render('login', {msg: ''})
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('*', (req, res) => {
    res.render('error')
})

// setting server....
app.listen(3000, () => {
    console.log('server running on port 3000')
})

