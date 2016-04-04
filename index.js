// index.js
'use strict';
const express = require('express');
const env = require('node-env-file');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

env(__dirname + '/.env');

const mandrill = require('node-mandrill')(process.env.MANDRILL_API_KEY);

app.set('port', process.env.PORT || 8000);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.post('/send', (req, res) => {
  let message = req.body;
  console.log(req.body);
  mandrill('/messages/send', {
    message: {
      to: [{email: 'contact@nuisepic.com', name: 'EPIC'}],
      from_email: message.sender_email,
      subject: 'Message from ' + message.sender_name,
      text: message.email_text
    }
  }, (error, response) => {
    if (error) {
      res.send(error);
    }
    res.json(response);
  });
});

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port'));
});
