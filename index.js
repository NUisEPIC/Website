// index.js
'use strict';
const express = require('express');
const env = require('node-env-file');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

env(__dirname + '/.env');

app.set('port', process.env.PORT || 8000);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');


app.engine('html', ejs.__express);
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/api/email', (req, res) => {
  let message = req.body;
  let data = {
    from: message.sender_name + ' <' + message.sender_email + '>',
    to: message.recipient_email,
    subject: 'Message from ' + message.sender_name,
    text: message.text
  };

  // mailgun request body example
  // var data = {
  //   from: 'Excited User <me@samples.mailgun.org>', //Format for alias: 'Excited User <me@samples.mailgun.org>'
  //   to: 'aaron@womentum.io',
  //   subject: 'Hello',
  //   text: 'Hello World!'
  // };

  mailgun.messages().send(data, function (error, result) {
    if (error) res.json(error);
    res.json(result);
  });
});


app.get('*', (req, res) => {
  res.render('index.html');
});

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port') + ' in ' + process.env.NODE_ENV);
});
