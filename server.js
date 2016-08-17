var http = require('http');
var app = require('./config/express')();

require('./config/mongoose')('mongodb://localhost/dynas');

http.createServer(app)
    .listen(app.get('port'), function () {

        console.log("Serviço no ar");

    });
