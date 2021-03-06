var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    active: {
        type: Boolean,
        default: true
    }
});

schema.pre('save', function (next) {
    this.increment();
    next();
});

schema.pre('update', function (next) {
    this.update({}, {$inc: {__v: 1}}, next);
});

module.exports = mongoose.model('Group', schema);

