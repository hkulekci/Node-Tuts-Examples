/*

	7 - Chat API

*/


var http = require('http'),
	fs = require('fs'),
	sys = require('sys'),
	io = require('socket.io'),
	mu = require('mu2'),
	clients = [];

var server = http.createServer(function(request, response){
	response.writeHead(200, {
		'Content-Type':'text/html'
	});

	//var rs = fs.createReadStream(__dirname + '/template.html');
	var rs = mu.compileAndRender(
			__dirname + '/template.html', 
			{SERVER: "192.168.2.138:8080"}
			);
	//rs = rs.replace("%SERVER%","192.168.2.138");
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
