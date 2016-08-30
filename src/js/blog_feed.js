ghost.init({ clientId: "ghost-frontend", clientSecret: "617d69bbb120" });

function onSuccess(data) {
  var feed = $('#blog-feed')[0];

  if (data.posts.length > 0) { $.each(data.posts, function (i, post) { var item =
      feed.appendChild(document.createElement('div')); $(item).addClass('item');

      var thumbnail = $(item).append("<img class='ui image thumbnail' src='http://localhost:2368" +
        post.image + "' />");

      var description = item.appendChild(document.createElement('div'));
    $(description).addClass('middle aligned content description');

      var title = description.appendChild(document.createElement('a'));
    title.appendChild(document.createTextNode(post.title)); $(title).addClass('header');

      var time = description.appendChild(document.createElement('div'));
    time.appendChild(document.createTextNode(moment(post.created_at).format('llll')));
    $(time).addClass('meta');

      var bodyDiv = description.appendChild(document.createElement('div')); var bodyText =
      bodyDiv.appendChild(document.createElement('p'));
    bodyText.appendChild(document.createTextNode(post.markdown.substring(0,100) + '...')); }); }
   else { feed.appendChild(document.createTextNode('No News')); }

}

$(document).ready(function () { $.get( ghost.url.api('posts', {limit: 10})).done(onSuccess); });
