/*

	6 - Chat API

	Download following Javascript File for websocket
		https://raw.github.com/ncr/node.ws.js/master/ws.js

*/


var http = require('http'),
	fs = require('fs'),
	sys = require('sys'),
	io = require('socket.io'),
	clients = [];

var server = http.createServer(function(request, response){
	response.writeHead(200, {
		'Content-Type':'text/html'
	});

	var rs = fs.createReadStream(__dirname + '/template.html');
	sys.pump(rs, response);

});


var socket = io.listen(server);

socket.on('connection', function(client){

	var username;

	client.send("Welcome to this chat socket.io server");
	client.send("Name : ");
	client.on('message', function(message){
		if (!username){
			username = message;
			client.send("Hello "+username);
			return;
		}
		client.broadcast.send(username + " sent : "+ message);
		client.send(username + " sent : "+ message);
	});

});

server.listen(8080);
