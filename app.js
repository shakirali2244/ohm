/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */

var app = require('express')();
var http = require('http').Server(app);
var io  = require('socket.io');  
var server = io.listen(4732);

app.get('/', function(req, res){
  res.sendfile('socket.html');
});

var macbook_socket = undefined;

server.sockets.on('connection', function(socket) {  
    socket.emit('helo', {msg: 'welcome'});
    socket.on('user', function(data) {
        if (data.type == "client") {
            //saving socket
            macbook_socket = socket;
        }
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.sockets.on('connection', function(socket){
console.log('a user connected');
socket.on('buttonpress',function(data){
  console.log(data);
});
});
console.log('exec');
*/


// Ensure we're in the project directory, so relative paths work as expected
// no matter where we actually lift from.
process.chdir(__dirname);

// Ensure a "sails" can be located:
(function() {
  var sails;
  try {
    sails = require('sails');
  } catch (e) {
    console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
    console.error('To do that, run `npm install sails`');
    console.error('');
    console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
    console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
    console.error('but if it doesn\'t, the app will run with the global sails instead!');
    return;
  }

  // Try to get `rc` dependency
  var rc;
  try {
    rc = require('rc');
  } catch (e0) {
    try {
      rc = require('sails/node_modules/rc');
    } catch (e1) {
      console.error('Could not find dependency: `rc`.');
      console.error('Your `.sailsrc` file(s) will be ignored.');
      console.error('To resolve this, run:');
      console.error('npm install rc --save');
      rc = function () { return {}; };
    }
  }



  // Start server
  sails.lift(rc('sails'));
})();

