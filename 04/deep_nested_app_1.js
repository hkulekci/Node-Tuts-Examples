/*
	4 - Deep nested Application

*/

var http = require('http');
var fs = require('fs');

var file_path = __dirname + '/../03/cat.jpg';
fs.stat(file_path, function(err, stat){

	if (err) throw err;
	var file_size = stat.size;

	fs.readFile(file_path, function(err, file_content){

		if (err) throw err;

		http.createServer(function(request, response){

			response.writeHead(200, 
			{
				'Content-Type':'image/jpeg',
				'Content-Length':file_size
			});

			response.end(file_content);

		}).listen(4000);
	});

});
