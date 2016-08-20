var mongoose = require('mongoose');

var schema = mongoose.Schema({
    initialValue: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
        enum : ['MENSAL', 'SEMANAL']
    }
});

schema.set('capped', 1);

module.exports = mongoose.model('Configuration', schema);