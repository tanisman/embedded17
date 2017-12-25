'use strict';
var mongoose = require('mongoose'),
    SensorData = mongoose.model('SensorDatas');
var express = require('express');
var tokenController = require('../controllers/tokenController');
var router = express.Router();


router.get('/:my_token', function (req, res) {
    tokenController.authorizeToken(req.params.my_token, 1, function (err, token) {
        if (err) {
            res.status(400);
            res.render('error', { message: err.message, error: {} });
        } else {
            SensorData.find({}, function (err, log) {
                if (err) {
                    res.status(400);
                    res.render('error', { message: err.message, error: {} });
                } else {
                    res.render('index', { title: 'Embedded17', results: log });
                }
            }).populate('measure_unit', 'name');
        }
    });
});

module.exports = router;
