const PATH = '/sprints';
const PATH_BY_ID = PATH + '/:id';

var sprintController = require('../controllers/sprintController');

module.exports = function (app) {

    app.route(PATH)
        .get(sprintController.query)
        .post(sprintController.create);

    app.route(PATH_BY_ID)
        .put(sprintController.update);

};
