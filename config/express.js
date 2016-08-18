var express = require('express');
var erroHandler = require('../config/errorHandler');

module.exports = function () {
    var app = express();

    app.set('port', process.env.PORT | 3000);

    app.use(express.static('/public'));
    app.use(require('body-parser').json());

    require('../routes/userRoute')(app);
    require('../routes/groupRoute')(app);

    app.use(erroHandler);

    return app;
};

