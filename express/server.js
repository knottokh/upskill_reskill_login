'use strict';

var express = require('express');
const serverless = require('serverless-http');
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var app = express();
var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
const router = express.Router();

var secret = 'This is the secret for signing tokens';




app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use('/', express.static(__dirname + '/dist'));
//app.use('/', express.static(path.join(__dirname, 'dist')));

// router.get('/', (req, res) => {
//   //console.log('ok');
//   res.sendFile(path.join(__dirname, '../dist/homepage.html'));
// });

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});


router.post('/login', function(req, res) {
  if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
    res.status(401).send('Wrong user or password');
    console.log('failed login');
    return;
  }
  console.log('successful login');
  // We are sending the profile inside the token
  var token = jwt.sign({ firstname: 'John', lastname: 'Doe'}, secret, { expiresIn: 5 * 60 });
  res.json({ token: token });
});


router.get('/api/profile', function (req, res) {
  console.log('user ' + req.user.firstname + ' is calling /api/profile');
  res.json({
    name: req.user.firstname
  });
});

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: secret}));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});


app.use('/.netlify/functions/server', router);  // path must route to lambda
//app.use('/', router);

//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index2.html')));



module.exports = app;
module.exports.handler = serverless(app);

// 'use strict';
// const express = require('express');
// const serverless = require('serverless-http');
// const app = express();
// const bodyParser = require('body-parser');

// const router = express.Router();
// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello Another from Express.js!</h1>');
//   res.end();
// });
// router.post('/', (req, res) => res.json({ postBody: req.body }));

// app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
// //app.use('/', router);  

// module.exports = app;
// module.exports.handler = serverless(app);