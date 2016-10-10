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

};


server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});



server.route({
    path: '/chickens/{breed}',
    method:'GET',
    handler: answer,
    config: {
        validate: {
            params: {
                with: Joi.string().required(),
                parameters: Joi.string().required()
            
            }
        }
    }
});





server.start(function () {
    console.log('Server running at:', server.info.uri);
});
