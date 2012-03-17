/*

	6 - Chat API

	Download following Javascript File for websocket
		https://raw.github.com/ncr/node.ws.js/master/ws.js

*/


var http = require('http'),
	fs = require('fs'),
	sys = require('sys'),
	ws = require('./ws.js'),
	clients = [];

http.createServer(function(request, response){
	response.writeHead(200, {
		'Content-Type':'text/html'
	});

	var rs = fs.createReadStream(__dirname + '/template.html');
	sys.pump(rs, response);

}).listen(4000);




ws.createServer(function(websocket){
	var username;
	websocket.on('connect',function(resource){
		clients.push(websocket);
		websocket.write('Welcome to chat server!');
		websocket.write('Enter your name : ');
	});

	websocket.on('data',function(data){
		if (!username){
			username = data.toString();
			websocket.write('Welcome ' + username);
			return;
		}

		var feedback = username + ' said : ' + data.toString();

		clients.forEach(function(client){
			client.write(feedback);
		});
	});

	websocket.on('close',function(){
		var pos = clients.indexOf(websocket);
		if (pos >= 0){
			clients.splice(pos, 1);
		}
			
	});
}).listen(8080);
