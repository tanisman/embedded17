var express = require('express');
var tokenController = require('../controllers/tokenController');

var router = express.Router();

router.post('/', tokenController.createToken);

module.exports = router;