if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const {ROLE, users} = require('./data')
const {authUser, authRole} = require('./basicAuth')
app.use(express.json())
app.use(setUser)

const initializePassport = require('./passport-config')
initializePassport(passport, username => {
    users.find(user => user.username === username)
    id => users.find(user => user.id === id)
})

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false

}))
app.use(passport.initialize())
app.use(passport.session())

//state to use the necassary files for the index.ejs are in the "public" folder
app.use(express.static(__dirname + '/public'))

app.get('/tutorview', authUser, authRole(ROLE.TUTOR), (req, res) => {
    res.render('index.ejs')
})

app.get('/studentview', authUser, authRole(ROLE.STUDENT), (req, res) => {
    res.render('student_page.ejs')
})

app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.post('/', passport.authenticate('local', {
    successRedirect: '/studentview',
    failureRedirect: '/',
    failureFlash: true
}))

function setUser(req, res, next) {
    const userId = req.body.userId
    if (userId) {
        req.user = users.find(user => user.id === userId)
    }
    next()
}



app.listen(3000)