let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const calendar = document.getElementById('calendar');

function load() {
    const dt = new Date();

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    /* Calculate how many days there are in a month*/
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    /* Get the first day of the month*/
    const firstDayOfMonth = new Date(year, month, 1);

    const dateString = firstDayOfMonth.toLocaleDateString('en-gb', {

        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',

    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    for(let i = 1; i<= paddingDays + daysInMonth; i++) {

        const daySquare = document.createElement('div');
    }

    console.log(paddingDays);
}

load();