// making an events array
var events = [];

// making an event class/constructor
function Event(detail) {
    this.detail = detail;
}

// add a new event
function addEvent(detail) {
    // if detail is not empty
    if (detail !== '') {
        var event = new Event(detail);
        events.push(event);
        return true;
    }

    // if detail is empty, return false
    return false;
}

// render events list
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
            renderEvents();
        };

        // appending HTML nodes to DOM tree
        event.appendChild(btnDelete);
        eventsList.appendChild(event);
    }
}

// onclick event listener for adding an event
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
