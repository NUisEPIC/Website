// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = 'g8q8g4on4aalcs1ab9jpo2fbt4@group.calendar.google.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
        }, handleAuthResult
    );
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';
        loadCalendarApi();
    }
    else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}


/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
    $(function() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
    });
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.setApiKey('AIzaSyC28V45KWDjvgHA0fwMi-tOLHlH0r44jS8');
    var request = gapi.client.calendar.events.list({
        'calendarId': 'g8q8g4on4aalcs1ab9jpo2fbt4@group.calendar.google.com',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    });

    request.execute(function(resp) {
        var events = resp.items;
        displayResults(events);
    });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function displayResults(events) {
    var feed = $('#event-feed')[0];

    if (events.length > 0) {
        for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = moment(new Date(event.start.dateTime || event.start.date));
            if (!when) {
                when = moment(event.start.date);
            }

            var $div = '<div>';
            var $h2 = '<h2>';
            var $a = '<a>';
            var $p = '<p>';
            var item = $($div, {class: 'item'})
            var calendar = $($div, {class: 'ui image calendar'})
                .append(($($div, {class: 'month'}))
                    .append($($h2, {text: when.format('MMM')})))
                .append(($($div, {class: 'date'}))
                    .append($($h2, {text: when.format('Do')})))
            var description = $($div, {class: 'middle aligned description content'})
                .append($($a, {class: 'header', text: event.summary}))
                .append($($div, {class: 'meta', text: when.format('llll')}))
                .append($($div)
                    .append($($p, {text: event.description})))
            item.append(calendar)
            item.append(description)
            $(feed).append(item)
        }
    } else {
        feed.appendChild(document.createTextNode('No upcoming events'));
    }
}
