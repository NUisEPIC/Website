ghost.init({
  clientId: "ghost-frontend",
  clientSecret: "617d69bbb120"
 });

 function onSuccess(data) {
  var $result = $('#blog-posts');
  $.each(data.posts, function (i, post) {
    $result.append(
      '<li>' + post.title + '</li> \n' +
      '<li>' + post.markdown + '</li>'
    );
  });
}

$(document).ready(function () {
  $.get(
    ghost.url.api('posts', {limit: 10})
  ).done(onSuccess);
});
