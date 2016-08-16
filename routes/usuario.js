const PATH = '/usuarios';
const PATH_BY_ID = PATH + '/:id';

var controller = require('../controllers/usuario')();

module.exports = function (app) {

    app.get(PATH, controller.query);

    app.post(PATH, controller.create);

    app.put(PATH_BY_ID, controller.update);

    app.delete(PATH_BY_ID, controller.delete);

};
