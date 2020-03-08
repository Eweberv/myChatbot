'use strict';

var mongoose = require('mongoose'),
    History = mongoose.model('History');

exports.saveHistory = async function(req, res) {
    console.log("save history appelé");
    const body = req.body;

    const history = new History({
        history: body.history
    });
    console.log(history);
    history.save(async function (err) {
        if (err) {
            return res.status(400).json({err: err.message});
        }
        res.json("History saved in db !");
    });
};