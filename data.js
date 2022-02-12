const ROLE = {
    TUTOR: 'tutor',
    STUDENT: 'student'
}

module.exports = {
    ROLE: ROLE,
    users: [
        { id: 1, name: 'Young', password: 'Park', role: ROLE.TUTOR},
        { id: 2, name: 'Olly', password: 'Ives', role:ROLE.STUDENT}
    ]
}