const PATH = '/transacoes';
const PATH_BY_ID = PATH + '/:id';

var transactionController = require('../controllers/transactionController');

module.exports = function (app) {

    app.route(PATH)
        .get(transactionController.query)
        .post(transactionController.create);

    app.route(PATH_BY_ID)
        .put(transactionController.update);

};
