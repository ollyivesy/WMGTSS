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

//render the index.ejs file to display on the /tutorview URL
app.get('/tutorview', (req, res) => {
    res.render('index.ejs')
})

//render the student_page.ejs file to display on the /studentview URL
app.get('/studentview',(req, res) => {
    res.render('student_page.ejs')
})

//render the login.ejs file to display on the /login URL
app.get('/', (req, res) => {
    res.render('login.ejs')
})

//define what port the server should start on
app.listen(3000)