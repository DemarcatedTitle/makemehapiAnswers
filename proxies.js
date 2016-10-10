var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert');
var path = require('path');
var Vision = require('vision');
var H2o2 = require('h2o2');

server.register(H2o2, function (err) {
    if (err) throw err;
});



server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});




server.route({path: '/proxy', method:'GET',
   //?name=Handling 
handler: {
    proxy: {
        host: 'localhost',
        port: 65535
    }
}
});


function answer(request, reply) {

    //request has all information. 
    //reply handles client response
    
    // console.log("Hello hapi");

    console.log(process.argv);

    return reply('Hello ' + request.params.name);
}

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
