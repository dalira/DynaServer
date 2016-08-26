var mongoose = require('mongoose');

var schema = mongoose.Schema({
    initialValue: {
        type: Number,
        required: true,
    }
});

schema.set('capped', 1);

module.exports = mongoose.model('Configuration', schema);