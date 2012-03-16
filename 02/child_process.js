/*
	2 - Child Process API

	More information about child process
		http://nodejs.org/docs/v0.3.1/api/child_processes.html
*/

var http = require('http');
var spawn = require('child_process').spawn;

http.createServer(function(request, response){

	response.writeHead(200,{'Content-Type':'text/plain'});

	// spawn(process name , [arguments])
	var tail_child = spawn('tail',['-f', '/var/log/system.log']);

	request.connection.on('end',function(){
		tail_child.kill();
	});

	tail_child.stdout.on('data', function(data){
		console.log(data.toString());
		response.write(data);
	});

}).listen(4000);
