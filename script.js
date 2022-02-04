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

    console.log(daysInMonth);
}

load();