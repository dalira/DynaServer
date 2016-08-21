var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    begin: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: 'Configuration',
        required: true
    }
});

schema.pre('save', function (next) {
    this.increment();
    next();
});

schema.pre('update', function (next) {
    this.update({}, {$inc: {__v: 1}}, next);
});

module.exports = mongoose.model('Sprint', schema);
