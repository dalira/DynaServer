const PATH = '/grupos';
const PATH_BY_ID = PATH + '/:id';

var groupController = require('../controllers/groupController');

module.exports = function (app) {

    app.get(PATH, groupController.query);

    app.post(PATH, groupController.create);

    app.put(PATH_BY_ID, groupController.update);

    app.delete(PATH_BY_ID, groupController.delete);

};
