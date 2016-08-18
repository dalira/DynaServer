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
        name : {
            type: String,
            required: true
        },
        admin  : {
            type: Boolean
        },
        grup : {
            type: mongoose.Schema.ObjectId,
            ref: 'Group'
        },
        active : {
            type: Boolean
        }
    });

    return mongoose.model('User', schema);

}();
