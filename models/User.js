var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema({
        login : {
            type : String,
            required: true,
            index : {
                unique : true
            }
        },
        email : {
            type: String,
            required: true
        },
        nome : {
            type: String,
            required: true
        },
        admin  : {
            type: Boolean
        },
        grupo : {
            type: mongoose.Schema.ObjectId,
            ref: 'Grupo'
        },
        ativo : {
            type: Boolean
        }
    });

    return mongoose.model('User', schema);

}();
