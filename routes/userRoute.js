const PATH = '/usuarios';
const PATH_BY_LOGIN = PATH + '/:login';

var userController = require('../controllers/userController');

module.exports = function (app) {

    app.route(PATH)
        .get(userController.query)
        .post(userController.create);

    app.route(PATH_BY_LOGIN)
        .get(userController.getByLogin)
        .put(userController.update);

};
