'use strict';
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

module.exports = function(app) {
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
    res.render('index.ejs');
  });
};
