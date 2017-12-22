var express = require('express');
var sensorDataController = require('../controllers/sensorDataController');

var router = express.Router();

router.post('/', sensorDataController.logSensorData);
router.get('/:my_token', sensorDataController.listSensorDataLogs);

module.exports = router;