'use strict';
var mongoose = require('mongoose'),
    SensorData = mongoose.model('SensorDatas');

var tokenController = require('./tokenController');

module.exports = {
    logSensorData: function (req, res) {
        tokenController.authorizeToken(req.body.my_token, 255, function (err, token) {
            if (err) {
                res.send(err);
            } else {
                var new_log = new SensorData(req.body);
                new_log.save(function (err, log) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(log);
                    }
                });
            }
        });
    },

    listSensorDataLogs: function (req, res) {
        tokenController.authorizeToken(req.params.my_token, 1, function (err, token) {
            if (err) {
                res.send(err);
            } else {
                SensorData.find({}, function (err, log) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json(log);
                    }
                }).populate('measure_unit');
            }
        });
    }
}