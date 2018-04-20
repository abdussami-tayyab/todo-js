// pick events from localStorage
// otherwise let the events array be empty
var storedEvents = localStorage.getItem("events");
var events = [];
if (storedEvents) {
    arrayData = JSON.parse(storedEvents);

    // restore storedEvents into 'events' stored in this 'window'
    for (i = 0; i < arrayData.length; i++) {
        addEvent(arrayData[i].detail);
    }
    // render events on page
    renderEvents();
}

/*
 * Making an Event Class.
 *
 * String  detail
 */
function Event(detail) {
    this.detail = detail;
}

/*
 * Add detail to an Event.
 *
 * String  detail
 */
function addEvent(detail) {
    // if detail is not empty
    if (detail !== '') {
        var event = new Event(detail);
        events.push(event);

        // store to localStorage
        localStorage.clear();
        localStorage.setItem("events", JSON.stringify(events));
        return true;
    }

    // if detail is empty, return false
    return false;
}

/*
 * Render events on page.
 *
 */
function renderEvents() {
    // get events list
    var eventsList = document.getElementById('events');
    eventsList.innerHTML = '';

    // add list items i.e. events to the list
    for (i = 0; i < events.length; i++) {
        // adding event
        var event = document.createElement('li');
        event.innerHTML = events[i].detail;
        event.className = 'list-group-item';

        // adding remove button to event
        var btnDelete = document.createElement('span');
        btnDelete.className = 'btn-delete';
        btnDelete.innerHTML = 'remove';
        btnDelete.setAttribute('data-event-index', i);
        // adding event listener for remove button
        btnDelete.onclick = function() {
            events.splice(this.getAttribute('data-event-index'), 1);
            localStorage.setItem("events", JSON.stringify(events));
            renderEvents();
        };

        // appending HTML nodes to DOM tree
        event.appendChild(btnDelete);
        eventsList.appendChild(event);
    }
}

/*
 * Event listener for adding an event.
 *
 * String  detail
 */
var btnAddEvent = document.getElementById('btn-add-event');
btnAddEvent.onclick = function() {
    // make a new event
    var newEvent = document.getElementById('new-event');
    // add it to the events array
    if (! addEvent(newEvent.value)) {
        alert('An event should have some detail, please try again :)');
    }

    // re-render list of events
    renderEvents();

    // empty input field
    document.getElementById('new-event').value = '';
};
