// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '593405078961-0g630li5iqlrbqvgphfo0i2ivphfoqtb.apps.googleusercontent.com';

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
    }, handleAuthResult);
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
  } else {
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
  $(document).ready(function() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
  });
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.setApiKey('AIzaSyAp_qFwhN7U2XtgUwRiNrMDhjOYicHBDmQ');
  var request = gapi.client.calendar.events.list({
    'calendarId': 'leon3546@gmail.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    console.log(resp);
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
  var header = feed.appendChild(document.createElement('h1'));

  if (events.length > 0) {
    header.appendChild(document.createTextNode('Upcoming Events: '));
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = new Date(event.start.dateTime);
      if (!when) {
        when = event.start.date;
      }

      var card = feed.appendChild(document.createElement('div'));
      $(card).addClass('ui centered fluid card');

      var cardContent = card.appendChild(document.createElement('div'));
      $(cardContent).addClass('content');

      var eventName = cardContent.appendChild(document.createElement('a'));
      eventName.appendChild(document.createTextNode(event.summary));
      $(eventName).addClass('header');

      var eventTime = cardContent.appendChild(document.createElement('div'));
      eventTime.appendChild(document.createTextNode(moment(when).format('llll')));
      $(eventTime).addClass('meta');

      var eventDescription = cardContent.appendChild(document.createElement('div'));
      eventDescription.appendChild(document.createTextNode(event.description));
      $(eventDescription).addClass('description');
    }
  } else {
    header.appendChild(document.createTextNode('No upcoming events'));
  }
}
