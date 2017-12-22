'use strict';
var mongoose = require('mongoose'),
    Token = mongoose.model('Tokens');

function findToken(token_id, callback) {
    Token.findOne(mongoose.Types.ObjectId(token_id), callback);
}

module.exports = {
    createToken: function (req, res) {
        console.log("createToken() => my_token=" + req.body.my_token);
        findToken(req.body.my_token, function (err, super_token) {
            if (err) {
                res.status(400).send({ success: 0, error: err.message });
            } else {
                if (super_token == null || super_token.access <= req.body.access) {
                    res.status(400).send({ success: 0, error: 'unauthorized action' });
                } else {
                    var new_token = new Token(req.body);
                    new_token.save(function (err, token) {
                        if (err) {
                            res.status(400).send({ success: 0, error: err.message });
                        } else {
                            res.json({ success: 1, created: token });
                        }
                    });
                }
            }
        });
    },

    authorizeToken: function (my_token, required_access, callback) {
        findToken(my_token, function (err, token) {
            if (err) {
                console.log("authorize token error: " + err);
                callback(err, null);
            } else {
                if (token == null || token.access < required_access) {
                    callback(new Error('unauthorized action'), token);
                } else {
                    callback(null, token);
                }
            }
        });
    }
}