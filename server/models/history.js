'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//modele pour l'historique dans la bdd
var HistorySchema = new Schema({
    history: {
        type: String,
    },
    register_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('History', HistorySchema);