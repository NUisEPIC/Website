function appendResults(events) {
      var results = $('#results');
      events.forEach(function(event) {
           results.appendChild(document.createElement('h1'));
           results.appendChild(document.createTextNode(event.summary));
           results.appendChild(document.createElement('p'));
           results.appendChild(document.createTextNode(event.description));
      });
}

function makeRequest() {
      var request = gapi.client.calendar.list({
        calendarId : "primary"
      });
      request.then(function(response) {
           appendResults(response.result.items);
      }, function(reason) {
           console.log('Error: ' + reason.result.error.message);
     });
}

function auth(cb) {
  var config = {
   client_id: GAPI_CALENDAR_CLIENT_ID,
   scope: ['https://www.googleapis.com/auth/calendar.readonly'],
   immediate: true
  };
  gapi.auth.authorize(config, function() {
   console.log('login complete');
   console.log(gapi.auth.getToken());
   cb();
  });
}

function init() {
      console.log('authorized!');
      gapi.client.setApiKey('0DbozGZFO_9xEnq5lfHSp4Gn');
      window.setTimeout(auth(function() {
        gapi.client.load('calendar', 'v3', makeRequest);
      }),1);

}
