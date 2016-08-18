var mongoose = require('mongoose');

module.exports = function () {

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

    schema.post('init', function(doc) {
        this._doc
        doc._old__v = doc.__v;
    });

    schema.pre('validate', function(doc) {
        doc._old__v = doc.__v;
    });

    schema.pre('save', function(next) {
        this.increment();
        next();
    });

    schema.pre('update', function( next ) {
        this.update({}, { $inc: { __v: 1 } }, next );
    });

    return mongoose.model('Group', schema);
}();
