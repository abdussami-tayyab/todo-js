// pick events from localStorage
// otherwise let the events array be empty
var storedEvents = localStorage.getItem("events");
var events = [];
if (storedEvents) {
    arrayData = JSON.parse(storedEvents);

    // restore storedEvents into 'events' stored in this 'window'
    for (i = 0; i < arrayData.length; i++) {
        addEvent(arrayData[i].title, arrayData[i].descripton, arrayData[i].createdOn);
    }
    // render events on page
    renderEvents();
}

/*
 * Making an Event Class.
 *
 * String  title
 * String  description
 * String  createdOn (date)
 */
function Event(title, description, createdOn) {
    this.title = title;
    this.descripton = description;
    this.createdOn = createdOn;
}

/*
 * Add detail to an Event.
 *
 * String  title
 * String  description
 * String  createdOn (date)
 */
function addEvent(title, description, createdOn) {
    // if title is not empty
    if (title !== '') {
        var event = new Event(title, description, createdOn);
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
 * Remove an Event.
 *
 * Array    events
 * Integer  index
 */
function deleteEvent(events, deleteIndex) {
    events.splice(deleteIndex, 1);
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
        event.innerHTML = events[i].title;
        event.className = 'list-group-item';

        // adding remove button to event
        var btnDelete = document.createElement('span');
        btnDelete.className = 'btn-delete';
        btnDelete.innerHTML = 'remove';
        btnDelete.setAttribute('data-event-index', i);
        // adding event listener for remove button
        btnDelete.onclick = function() {
            deleteEvent(events, this.getAttribute('data-event-index'));
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
 */
var btnAddEvent = document.getElementById('btn-add-event');
btnAddEvent.onclick = function() {
    // make a new event
    // get title
    var newTitle = document.getElementById('new-title');
    // get description
    var newDescription = document.getElementById('new-description');
    // get createdOn date
    var createdOn = document.getElementById('created-on');

    // add it to the events array
    if (! addEvent(newTitle.value, newDescription.value, createdOn.value)) {
        alert('An event should have some detail, please try again :)');
    }

    // re-render list of events
    renderEvents();

    // empty input field
    document.getElementById('new-title').value = '';
    document.getElementById('new-description').value = '';
};
