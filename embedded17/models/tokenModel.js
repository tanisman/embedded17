'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TokenSchema = new Schema({
    name: {
        type: String,
        default: "No Name"
    },
    access: {
        type: Number,
        default: 0
    },
    added_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Tokens', TokenSchema);
