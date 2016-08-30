var mongoose = require('mongoose');
var mongooseBcrypt = require('mongoose-bcrypt');

var schema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
});

schema.plugin(mongooseBcrypt);

module.exports = mongoose.model('User', schema);