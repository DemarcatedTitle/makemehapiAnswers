var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert');
var path = require('path');
var Vision = require('vision');
var fs = require('fs');
var Joi = require('joi');

var Boom = require('boom');
var rot13 = require('rot13-transform');

// server.register(Inert, function (err) {
//     if (err) throw err;
// });


var answerSet = function (request, reply) {
        // session = {session:{ key: 'makemehapi' }};
        reply('success').state('session', { key: 'makemehapi' });
};

var answerCheck = function (request, reply) {
    if (session) {
        return reply({ user: 'hapi' });
    } else {
        return reply(Boom.unauthorized('Missing authentication'));
    }

};

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});


server.state('session', {
    path: '/',
    ttl: 10,
    encoding: 'base64json',
    domain: 'localhost',
    isSecure: false,
    isHttpOnly: false,
    isSameSite: false
    //Some of these options are required but not explicitly mentioned
});


server.route({
    path: '/set-cookie',
    method: 'GET',
    handler: answerSet,
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
});

server.route({
    path: '/check-cookie',
    method: 'GET',
    handler: answerCheck,
    config: {
            state: {
                parse: true,
                failAction: 'error'
            }
        }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
