var mongoose = require('mongoose');

var schema = mongoose.Schema({
    from: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    sprint: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group',
        required: true
    },
    motive: String
});

schema.pre('save', function (next) {
    this.increment();
    next();
});

schema.pre('update', function (next) {
    this.update({}, {$inc: {__v: 1}}, next);
});

module.exports = mongoose.model('Transaction', schema);