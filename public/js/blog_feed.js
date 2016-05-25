ghost.init({
  clientId: "ghost-frontend",
  clientSecret: "617d69bbb120"
 });

 function onSuccess(data) {
  var blog = $('#blog-feed')[0];
  var header = blog.appendChild(document.createElement('h1'));

  if (data.posts.length > 0) {
    header.appendChild(document.createTextNode('Recent News: '));
    $.each(data.posts, function (i, post) {
        var card = blog.appendChild(document.createElement('div'));
        $(card).addClass('ui centered fluid card');

        var cardContent = card.appendChild(document.createElement('div'));
        $(cardContent).addClass('content');

        var eventName = cardContent.appendChild(document.createElement('a'));
        eventName.appendChild(document.createTextNode(post.title));
        $(eventName).addClass('header');

        var eventTime = cardContent.appendChild(document.createElement('div'));
        eventTime.appendChild(document.createTextNode(moment(post.created_at).format('llll')));
        $(eventTime).addClass('meta');

        var eventDescription = cardContent.appendChild(document.createElement('div'));
        eventDescription.appendChild(document.createTextNode(post.markdown));
        $(eventDescription).addClass('description');
    });
  }
  else {
    header.appendChild(document.createTextNode('No News'));
  }

}

$(document).ready(function () {
  $.get(
    ghost.url.api('posts', {limit: 10})
  ).done(onSuccess);
});
