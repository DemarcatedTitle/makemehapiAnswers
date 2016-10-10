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

    return reply('login successful');
};


server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});



// server.route({
//     path: '/chickens/{breed}',
//     method:'GET',
//     handler: answer,
//     config: {
//         validate: {
//             params: {
//                 with: Joi.string().required(),
//                 parameters: Joi.string().required()
            
//             }
//         }
//     }
// });

server.route({
    path: '/login',
    method: 'POST',
    handler: answer,
    config: {
        validate: {
            payload: Joi.object({
                username: Joi.string(),
                password: Joi.string().alphanum(),
                accessToken: Joi.string().alphanum(),
                isGuest: Joi.boolean()
                // birthyear: Joi.number().integer().min(1900).max(2013),
                // email: Joi.string().email()
            })
                    .options({allowUnknown: true})
                    .with('username', 'isGuest')
                    .without('password', 'accessToken')
        }
    }
});




server.start(function () {
    console.log('Server running at:', server.info.uri);
});
