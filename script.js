let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const calendar = document.getElementById('calendar');
const newEventWindow = document.getElementById('newEventWindow');
const backDrop = document.getElementById('eventWindowBackdrop');

function openEventWindow(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        console.log('Event already exists');

    } else {
        newEventWindow.style.display = 'block';

    }
    backDrop.style.display = 'block';
}

function load() {
    const dt = new Date();

    /* logic to determine what month is displayed if Next or Back button is clicked*/
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }    

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
    /* Render the Month name and the Year in the header */
    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-gb', { month: 'long'})} ${year}`;

    /* Make the Calendar only render the current Months Days.
    Without this, the calendar would infinitely render all days of every month as a list whenever the month is changed.*/
    calendar.innerHTML = '';

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
            daySquare.addEventListener('click', () => openEventWindow(`${month + 1}/${i - paddingDays}/${year}`));

        /* If there is a padding day, render an empty square*/    
        } else {
            daySquare.classList.add('padding');

        }
        /* Render the day squares inside the Calendar container*/
        calendar.appendChild(daySquare);
    }

    console.log(paddingDays);

}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

}
initButtons();
load();