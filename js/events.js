// making an events array
var events = [];

// making an event class/constructor
function Event(detail) {
    this.detail = detail;
}

// add a new event
function addEvent(detail) {
    var event = new Event(detail);
    events.push(event);
}

// render events list
function renderEvents() {
    var eventsList = document.getElementById('events');
    eventsList.innerHTML = '';
    for (i = 0; i < events.length; i++) {
        var event = document.createElement('li');
        event.innerHTML = events[i].detail;
        eventsList.appendChild(event);
    }
}

// onclick event listener for adding an event
var btnAddEvent = document.getElementById('btn-add-event');
btnAddEvent.onclick = function() {
    // make a new event
    var newEvent = document.getElementById('new-event');
    // add it to the events array
    addEvent(newEvent.value);

    // re-render list of events
    renderEvents();

    // empty input field
    document.getElementById('new-event').value = '';
};
