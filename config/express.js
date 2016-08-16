var express = require('express');

module.exports = function () {
    var app = express();

    app.set('port', process.env.PORT | 3000);

    app.use(express.static('/public'));
    app.use(require('body-parser').json());

    require('../routes/usuario.js')(app);

    return app;
};

