if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
app.use(express.json())

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
//state to use the necassary files for the index.ejs are in the "public" folder
app.use(express.static(__dirname + '/public'))

app.get('/tutorview', (req, res) => {
    res.render('index.ejs')
})

app.get('/studentview',(req, res) => {
    res.render('student_page.ejs')
})

app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.listen(3000)