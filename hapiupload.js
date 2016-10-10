var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert');
var path = require('path');
var Vision = require('vision');
var fs = require('fs');
var Joi = require('joi');

var rot13 = require('rot13-transform');

// server.register(Inert, function (err) {
//     if (err) throw err;
// });


var answer = function (request, reply) {
    var body = '';
    request.payload.file.on('data', function (data){
        body += data;
    });
    request.payload.file.on('end', function (){

        var finalAnswer = {
            description: request.payload.description,
            file: {
                data: body,
                filename: request.payload.file.hapi.filename,
                headers: request.payload.file.hapi.headers
            }
        };
        return reply(finalAnswer);
    });

};


server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});




server.route({
    path: '/upload',
    method: 'POST',
    // description: '',
    // file: '',
    
    
    config: {
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data',
        }
    },
    handler: answer
});


server.start(function () {
    console.log('Server running at:', server.info.uri);
});
