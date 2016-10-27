document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    // get the logo and add the "shrink" class
    var logo = document.getElementById('logo');
    // TODO(jordan): Use classList instead.
    console.log('Load is shrinking logo');
    logo.className += " shrink";
  }, 1000)
})
