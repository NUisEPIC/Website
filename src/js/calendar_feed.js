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
  gapi.client.setApiKey('AIzaSyAp_qFwhN7U2XtgUwRiNrMDhjOYicHBDmQ');
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

      var item = feed.appendChild(document.createElement('div'));
      $(item).addClass('item');

      var calendar = item.appendChild(document.createElement('div'));
      $(calendar).addClass('ui image calendar');
      var month = calendar.appendChild(document.createElement('div'));
      $(month).addClass('month');
      var monthText = month.appendChild(document.createElement('h2'));
      monthText.appendChild(document.createTextNode(when.format('MMM')));
      var date = calendar.appendChild(document.createElement('div'));
      $(date).addClass('date');
      var dateText = date.appendChild(document.createElement('h2'));
      dateText.appendChild(document.createTextNode(when.format('Do')));

      var description = item.appendChild(document.createElement('div'));
      $(description).addClass('middle aligned content description');

      var eventName = description.appendChild(document.createElement('a'));
      eventName.appendChild(document.createTextNode(event.summary));
      $(eventName).addClass('header');

      var eventTime = description.appendChild(document.createElement('div'));
      eventTime.appendChild(document.createTextNode(when.format('llll')));
      $(eventTime).addClass('meta');

      var descriptionDiv = description.appendChild(document.createElement('div'));
      var descriptionText = descriptionDiv.appendChild(document.createElement('p'));
      descriptionText.appendChild(document.createTextNode(event.description));

    }
  } else {
    feed.appendChild(document.createTextNode('No upcoming events'));
  }
}
