var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({path: '/', method:'GET', handler: answer});

function reply() {
    console.log("Hello hapi");
}

function answer(request, reply) {

    //request has all information. 
    //reply handles client response
    
    // console.log("Hello hapi");

    console.log(process.argv);

    return reply('Hello hapi');
}

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
