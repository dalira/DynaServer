const PATH = '/usuarios';
const PATH_BY_ID = PATH + '/:id';

var userController = require('../controllers/userController')();

module.exports = function (app) {

    app.get(PATH, userController.query);

    app.post(PATH, userController.create);

    app.put(PATH_BY_ID, userController.update);

    app.delete(PATH_BY_ID, userController.delete);

};
