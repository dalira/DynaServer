var express = require('express');
var erroHandler = require('../config/errorHandler');

module.exports = function () {
    var app = express();

    app.set('port', process.env.PORT | 3000);

    app.use(express.static('/public'));
    app.use(require('body-parser').json());

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
        next();
    });

    require('../config/passport')(app);

    require('../routes/authRoute')(app);
    require('../routes/userRoute')(app);
    require('../routes/groupRoute')(app);
    require('../routes/configurationRoute')(app);
    require('../routes/sprintRoute')(app);
    require('../routes/transactionRoute')(app);

    app.use(erroHandler);

    return app;
};

