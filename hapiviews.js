var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert');
var path = require('path');
var Vision = require('vision');


// server.register(Inert, function (err) {
//     if (err) throw err;
// });

server.register(Vision, function (err) {
    if (err) throw err;
});


server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});


server.views({
    engines: {
        html: require('handlebars')
    },
    path: path.join(__dirname, 'templates')
});


server.route({path: '/', method:'GET',
   //?name=Handling 
handler: {
    view: "index.html"
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
