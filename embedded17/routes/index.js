'use strict';
var mongoose = require('mongoose'),
    SensorData = mongoose.model('SensorDatas');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res) {
    tokenController.authorizeToken(req.params.my_token, 1, function (err, token) {
        if (err) {
            res.status(400).send({ success: 0, error: err.message });
        } else {
            SensorData.find({}, function (err, log) {
                if (err) {
                    res.status(400).send({ success: 0, error: err.message });
                } else {
                    res.render('index', { title: 'Embedded17', results: log });
                }
            }).populate('measure_unit', 'name');
        }
    });
});

module.exports = router;
