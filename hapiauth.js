var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert');
var path = require('path');
var Vision = require('vision');
var fs = require('fs');
var Joi = require('joi');
var basic = require('hapi-auth-basic');

var Boom = require('boom');
var rot13 = require('rot13-transform');


var users = {
    hapi : {
        username : 'hapi',
        password: 'auth'
    }
};


//somehow this worked
var validate = function (request, username, password, callback) {
    var user = users[username];
    if (username === 'hapi' && password === 'auth') {
        return callback(null, true, {user: user.username});

    } else {
        return callback(null, false);
    }

};
var callback = function (err, isValid, credentials) {
    
        
};

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});


server.register(basic, function (err) {
        if (err) {throw err;}

});

server.auth.strategy('simple', 'basic', { validateFunc: validate });

server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
        },
            handler: function (request, reply) {

                return reply('this worked');
            }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
