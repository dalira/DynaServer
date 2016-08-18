var mongoose = require('mongoose');

module.exports = function () {

    var schema = mongoose.Schema({
        name : {
            type : String,
            required: true,
            index : {
                unique : true
            }
        },
        active : {
            type: Boolean,
            default: true
        }
    });

    return mongoose.model('Group', schema);

}();
