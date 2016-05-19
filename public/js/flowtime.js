Flowtime.showProgress(true);

// Start Flowtime.js with above configurations
Flowtime.start();

$(document).ready(function() {
  // $('#home').load('./views/home.html');
  $('#nav').click(function() {
    Flowtime.toggleOverview(true);
  });
})
