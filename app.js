
var express = require('express'); // Get the express module
var app = express();
var serv = require('http').Server(app); // Here we create a server

app.get('/', function(req, res) { // If the request url does not exsist then 
	res.sendFile(__dirname + '/client/index.html'); // send them to the index
});
app.use('/client', express.static(__dirname + '/client')); // If the url equals the client, then send client contents

serv.listen(2000); // Here we make the server listen to the port 2000, which means that whenever there is a request to the port 2000, our server will be notified

console.log("Server started"); // Indication to show that server has started

var Player = function(id){
	var self = {
		id: id,
		x: 10,
		y: 10,
		color: ['lime', 'red', 'orange', 'purple', 'yellow', 'aqua', 'blue'][Math.floor(6 * Math.random())],
		pressingRight: false,
		pressingLeft: false,
		speed: 3
	}

	self.move = function(){
		if(self.pressingRight && !self.pressingLeft){
			self.x+=self.speed;
			self.pressingLeft = true;
		}
	} 

	return self;
}

var SOCKET_LIST = {};
var PLAYER_LIST = {};

var io = require("socket.io")(serv, {});

io.sockets.on('connection', function(socket){
	//console.log(SOCKET_LIST.length);
	if(Object.keys(SOCKET_LIST).length < 2){
		var id = Math.random();
		socket.id = id;
		var player = Player(id);

		SOCKET_LIST[socket.id] = socket;
		PLAYER_LIST[player.id] = player;

		if(Object.keys(PLAYER_LIST).length > 1){
			player.y = 400;
		}

		socket.on('keyPress', function(data){
			var key = data.key;
			if(key == 37 || key == 65){
				player.pressingLeft = data.state;
			}
			
			if(key == 39 || key == 68){
				player.pressingRight = data.state;
			}
		});

		socket.on('disconnect', function(){
			delete SOCKET_LIST[socket.id];
			delete PLAYER_LIST[player.id];
		});
	}
});

setInterval(function(){
	var pack = [];
	for(var i in PLAYER_LIST){
		var player = PLAYER_LIST[i];
		player.move();

		pack.push({
			x: player.x,
			y: player.y,
		 	color: player.color
		});
	}

	for(var i in SOCKET_LIST){
		var socket = SOCKET_LIST[i];
		socket.emit("playerData", pack);
	}

}, 1000/30);