let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const calendar = document.getElementById('calendar');
const newEventWindow = document.getElementById('newEventWindow');
const deleteEventWindow = document.getElementById('deleteEventWindow');
const backDrop = document.getElementById('eventWindowBackdrop');
const eventTitleInput = document.getElementById('eventTitleInput')
const eventDescriptionInput = document.getElementById('eventDescriptionInput')
const evenTimeInput = document.getElementById('eventTimeInput')

function openEventWindow(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        document.getElementById('eventDescriptionText').innerText = eventForDay.description;
        document.getElementById('eventTimeText').innerText = eventForDay.time;
        deleteEventWindow.style.display = 'block';
    } else {
        newEventWindow.style.display = 'block';

    }
    backDrop.style.display = 'block';
}
//this will be the main function that render the calendar board correctly
function load() {
    const dt = new Date();

    // logic to determine what month is displayed if Next or Back button is clicked*/
    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }    

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    // Calculate how many days there are in a month*/
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the first day of the month*/
    const firstDayOfMonth = new Date(year, month, 1);

    const dateString = firstDayOfMonth.toLocaleDateString('en-gb', {

        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric', 
    });

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    // Render the Month name and the Year in the header */
    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-gb', { month: 'long'})} ${year}`;

    // Make the Calendar only render the current Months Days.
    //Without this, the calendar would infinitely render all days of every month as a list whenever the month is changed.*/
    calendar.innerHTML = '';

    // Render the day squares for the month */
    for(let i = 1; i<= paddingDays + daysInMonth; i++) {

        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        /* Define if there should be a padding day or an actual day */

        /* Render a day square if the day is not a padding day*/
        if (i > paddingDays) {
            /* Render the number of the day inside the day square*/
            daySquare.innerText = i - paddingDays;

            const eventForDay = events.find(e => e.date === dayString);

            if(i - paddingDays === day && nav === 0){
                daySquare.id = 'currentDay';

            }

            if (eventForDay){
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            /* Define function using a click listener whenever the user clicks a day square*/
            daySquare.addEventListener('click', () => openEventWindow(dayString));

        /* If there is a padding day, render an empty square*/    
        } else {
            daySquare.classList.add('padding');

        }
        /* Render the day squares inside the Calendar container*/
        calendar.appendChild(daySquare);
    }

    console.log(paddingDays);

}
//if an event window is closed, then make the folowing variables the following --
function closeEventWindow(){
    eventTitleInput.classList.remove('error');
    newEventWindow.style.display = 'none';
    deleteEventWindow.style.display = 'none';
    eventWindowBackdrop.style.display = 'none';
    eventTitleInput.value = '';
    eventDescriptionInput.value = '';
    eventTitleInput.value = '';
    clicked = null;
    load();
}
//if an event is created and saved, push the data that has been inputted by the user to local storage under their corresponding value
function saveEvent(){
    if (eventTitleInput.value){
        eventTitleInput.classList.remove('error');
        //save the inputted data
        events.push({
            date:clicked,
            title: eventTitleInput.value,
            description: eventDescriptionInput.value,
            time: evenTimeInput.value,
        });
        //save all data to localstorage (this would usually save to an external database)
        localStorage.setItem('events', JSON.stringify(events));
        closeEventWindow();

    } else {
        eventTitleInput.classList.add('error');
    }

}
//if an event is deleted, delete all locally saved data for that specific event. Also call the closeEventWindow function to make sure all data is cleared
function deleteEvent(){
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeEventWindow();
}

//define the logic for all the buttons
function initButtons() {
    //change the nav variable to a postive to let the load() function know that the user is going to the next month
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    //change the nav variable to a negative to let the load() function know that the user is going to the previous month
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });
    //call the corresponding logic whether the save,cancel,delete,close button is clicked.
    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeEventWindow);

    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeEventWindow);

}

initButtons();
load();