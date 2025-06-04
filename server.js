const express = require('express')
const app = express()
const port = 3000
const client_id = 'eI0YZh1JGCDA1aQWEQ0z';
const client_secret = 'dbrYaFWkuq';

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/shopping.html');
});

app.get('/search/blog', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query);
   var request = require('request');

   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
