$(document).ready(function() {
  $('#subscribe').modal();         // Initialize modal

  $('#showSubscribe')              // Show modal on click
    .click(function() {
      $('#subscribe').modal('show');
    });
});
