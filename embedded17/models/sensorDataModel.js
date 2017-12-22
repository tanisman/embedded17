'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SensorSchema = new Schema({
    temperature: {
        type: Number
    },
    humidity: {
        type: Number  
    },
    log_date: {
        type: Date,
        default: Date.now
    },
    measure_unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tokens'
    }
});


module.exports = mongoose.model('SensorDatas', SensorSchema);
