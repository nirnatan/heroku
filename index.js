var express = require('express');
var request = require('request');
var cors = require('cors');
var API_KEY = 'bozeXoDhGzNfn-w5bnRhcL';
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(cors());

app.get('/', function(req, res) {
  res.send('init');
});

app.get('/:event/:value1?/:value2?/:value3?', function(req, res) {
  var iftttUrl = 'https://maker.ifttt.com/trigger/' + req.params.event + '/with/key/' + API_KEY + '?value1=' + (req.params.value1 || '') + '&value2=' + (req.params.value2 || '') + '&value3=' + (req.params.value3 || '');
  console.log(iftttUrl);
  request(iftttUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});