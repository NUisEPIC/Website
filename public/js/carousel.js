Flowtime.showProgress(true);


// Start Flowtime.js with above configurations
Flowtime.start();

$(document).ready(function() {
  $('#menu').click(function(){
    Flowtime.toggleOverview(true);
  });
})
