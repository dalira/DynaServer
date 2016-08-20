const PATH = '/usuarios';
const PATH_BY_ID = PATH + '/:id';

var userController = require('../controllers/userController');

module.exports = function (app) {

    app.route(PATH)
        .get(userController.query)
        .post(userController.create);

    app.route(PATH_BY_ID)
        .get(userController.getById)
        .put(userController.update);

};
