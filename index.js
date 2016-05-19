// index.js
'use strict';
const express = require('express');
const env = require('node-env-file');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');


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

require('./app/routes')(app);

app.listen(app.get('port'), () => {
  console.log('Listening on port ' + app.get('port') + ' in ' + process.env.NODE_ENV);
});
