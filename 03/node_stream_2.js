/*
	3 - Node Streams

	More information about streams
		http://nodejs.org/docs/v0.3.1/api/streams.html
*/

var http = require('http');
var fs = require('fs');

var file_path = __dirname + '/cat.jpg';
fs.stat(file_path, function(err, stat){

	if (err){
		throw err;
	}

	http.createServer(function(request, response){

		response.writeHead(200, 
			{
				'Content-Type':'image/jpeg',
				'Content-Length':stat.size
			});

		var rs = fs.createReadStream(file_path);

		rs.on('data', function(data){
			var flushed = response.write(data);
			if (!flushed){
				rs.pause();
			}
		});

		response.on('drain', function(){
			rs.resume();
		});

		rs.on('end', function(){
			response.end();
		});
		
	}).listen(4000);

});
