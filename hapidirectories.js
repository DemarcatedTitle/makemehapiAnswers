var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert');
var path = require('path');


server.register(Inert, function (err) {
    if (err) throw err;
});

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({path: '/foo/bar/baz/file.html', method:'GET', handler: {file: path.join(__dirname, "index.html")}});


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
