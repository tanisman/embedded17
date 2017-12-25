'use strict';
var mongoose = require('mongoose'),
    SensorData = mongoose.model('SensorDatas');

var tokenController = require('./tokenController');
var pug = require('pug');

module.exports = {
    logSensorData: function (req, res) {
        tokenController.authorizeToken(req.body.my_token, 255, function (err, token) {
            if (err) {
                res.status(400).send({ success: 0, error: err.message });
            } else {
                var new_log = new SensorData(req.body);
                new_log.save(function (err, log) {
                    if (err) {
                        res.status(400).send({ success: 0, error: err.message });
                    } else {
                        var io = req.app.get('socketio');
                        log.populate('measure_unit', function (err) {
                            var html = pug.compile(`tr
                            td #{ measure_unit.name }
                            td #{ log_date }
                            td #{ temperature }
                            td #{ humidity }`)(log);
                            io.sockets.emit('update table', html);
                            res.json({ success: 1, created: log });
                        });
                    }
                });
            }
        });
    },

    listSensorDataLogs: function (req, res) {
        tokenController.authorizeToken(req.params.my_token, 1, function (err, token) {
            if (err) {
                console.log("listSensorDataLogs error: " + err);
                res.status(400).send({ success: 0, error: err.message });
            } else {
                SensorData.find({}, function (err, log) {
                    if (err) {
                        res.status(400).send({ success: 0, error: err.message });
                    } else {
                        res.json({ success: 1, logs: log });
                    }
                }).populate('measure_unit', 'name');
            }
        });
    }
}