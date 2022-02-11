const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')

const initializePassport = require('./passport-config')
initializePassport(passport, username => {
    users.find(user => user.username === username)
})

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

//state to use the necassary files for the index.ejs are in the "public" folder
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/login', (req, res) => {
    
})




app.listen(3000)