var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert');
var path = require('path');
var Vision = require('vision');
var fs = require('fs');

var rot13 = require('rot13-transform');

// server.register(Inert, function (err) {
//     if (err) throw err;
// });


var answer = function (request, reply) {

    return reply(
    fs.createReadStream(path.join(__dirname, 'test.txt'), {autoClose: true})
        .pipe(rot13())
    );
};


server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});



server.route({path: '/', method:'GET',
   //?name=Handling 
handler: answer
});





server.start(function () {
    console.log('Server running at:', server.info.uri);
});
