/*
Hello World Example 


to run this example 
	node hello_world.js

*/

var http = require('http');
var server = http.createServer(function(request, response){
	console.log("new request");
	response.writeHead(200, {'Content-Type':'text/plain'});
	response.write('Hello World');
	response.end();
});

server.listen(4000);

// Some improvements / Alternative Usage

/*
var http = require('http');
var server = http.createServer(function(request, response){
	console.log("new request");
	response.writeHead(200, {'Content-Type':'text/plain'});
	response.end('Hello World');
});

server.listen(4000);
*/


/*
var http = require('http');
var server = http.createServer(function(request, response){
	console.log("new request");
	response.writeHead(200, {'Content-Type':'text/plain'});
	response.end('Hello World');
}).listen(4000);
*/