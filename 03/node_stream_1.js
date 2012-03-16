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

		fs.readFile(file_path, function(err, file_content){
			response.write(file_content);
			response.end();
		});
		
	}).listen(4000);

});



/*
Error : 


	/Volumes/webroot/github/NodeTutsExamples/03/node_streams.js:23
					'Content-Length':stat.size
	    ^^^^^^^^^^^^^^^^

	node.js:134
	        throw e; // process.nextTick error, or 'error' event on first tick
	        ^
	SyntaxError: Unexpected string
	    at Module._compile (module.js:397:25)
	    at Object..js (module.js:408:10)
	    at Module.load (module.js:334:31)
	    at Function._load (module.js:293:12)
	    at Array.<anonymous> (module.js:421:10)
	    at EventEmitter._tickCallback (node.js:126:26)

When : [on line 22 i forgot "," end of the line]

20			response.writeHead(200, 
21			{
22				'Content-Type':'image/jpeg'
23				'Content-Length':stat.size
24			});
	

*/



