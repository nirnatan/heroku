var express = require('express');
var request = require('request');
var cors = require('cors');
var _ = require('lodash');
var API_KEY = 'bozeXoDhGzNfn-w5bnRhcL';
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(cors());

app.get('/', function(req, res) {
  res.send('init');
});

var map = {
  default: API_KEY
};

app.get('/init/:name/:api', function(req, res) {
  map[req.params.name] = req.params.api;
  res.send('initialized succefully');
});

app.get('/run/:name/:event', function(req, res) {
  var iftttUrl = 'https://maker.ifttt.com/trigger/' + req.params.event + '/with/key/' + map[req.params.name];
  request.post({url: iftttUrl, form: req.query}, function(error, response, body) {
    res.send(body);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
