'use strict';
var mongoose = require('mongoose'),
    Token = mongoose.model('Tokens');

function findToken(token_id, callback) {
    Token.find(mongoose.Schema.Types.ObjectId(token_id), callback);
}
module.exports = {
    createToken: function (req, res) {
        findToken(req.body.my_token, function (err, super_token) {
            if (err) {
                res.send(err);
            } else {
                if (super_token.access <= req.body.access) {
                    res.send(new Error('unauthorized action'));
                } else {
                    var new_token = new Token(req.body);
                    new_token.save(function (err, token) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json(token);
                        }
                    });
                }
            }
        });
    },

    authorizeToken: function (my_token, required_access, callback) {
        findToken(my_token, function (err, token) {
            if (err) {
                callback(err, null);
            } else {
                if (token.access < required_access) {
                    callback(new Error('unauthorized action'), token);
                } else {
                    callback(null, token);
                }
            }
        });
    }
}