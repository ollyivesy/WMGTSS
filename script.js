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
    /* Render the day squares for the month */
    for(let i = 1; i<= paddingDays + daysInMonth; i++) {

        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        /* Define if there should be a padding day or an actual day */

        /* Render a day square if the day is not a padding day*/
        if (i > paddingDays) {
            /* Render the number of the day inside the day square*/
            daySquare.innerText = i - paddingDays;

            /* Define function using a click listener whenever the user clicks a day square*/
            daySquare.addEventListener('click', () => console.log('click'));

        /* If there is a padding day, render an empty square*/    
        } else {
            daySquare.classList.add('padding');

        }
        /* Render the day squares inside the Calendar container*/
        calendar.appendChild(daySquare);
    }

    console.log(paddingDays);
}

load();