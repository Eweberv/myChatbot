'use strict';

//les différentes routes accessibles sur le serveur
module.exports = function(app) {
    var historyController = require('../controllers/historyController');

    // server Routes
    app.route('/saveHistory')
        .post(historyController.saveHistory);
};
