const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport){
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: 'No User with that Username' })
        }

    }
    passport.use(new LocalStrategy({ usernameField: 'username'}), authenticateUser)
    passport.serializeUser((user, done) => {  })
    passport.deserializeUser((id, done) => {  })

}