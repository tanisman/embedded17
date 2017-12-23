var express = require('express');
var tokenController = require('../controllers/tokenController');
var mongoose = require('mongoose'),
    Token = mongoose.model('Tokens');

var router = express.Router();

//router.post('/', tokenController.createToken);
router.post('/', function (req, res) {
    var new_token = new Token(req.body);
    new_token.save(function (err, token) {
        if (err) {
            res.status(400).send({ success: 0, error: err.message });
        } else {
            res.json({ success: 1, created: token });
        }
    });
});
module.exports = router;