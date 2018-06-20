let express = require('express'); // Import the express module, now the var express holds the framework of express, this express variable is also a function, thus we can use it as express();
let socket = require('socket.io'); // Import the socket module, allows us get inputs from the client and output data from the server to the clients

/* Set up server using express */
let app = express(); // Call express, this allows us to make an express application - an app which host our website
let server = app.listen(2000); // Create a server on port 2000

/* Host files on the express server found in 'client' */
app.use(express.static('client')); // This is saying for the app to host everything in the 'client' folder

/* Setup the io for sockets */
let io = socket(server); // Creats the io object which allows use to use sockets functionality

/* Log success */
console.log("Server is running!"); // log that the server is running.

let SOCKET_LIST = {}; // Holds all the connected sockets
io.sockets.on('connection', function(socket){
		socket.id = Math.random();

		/*socket.on('x', (data) => {

		});

		socket.on('disconnect', function(){
			delete SOCKET_LIST[socket.id];
		});*/
});

setInterval(function(){


}, 1000/30);
