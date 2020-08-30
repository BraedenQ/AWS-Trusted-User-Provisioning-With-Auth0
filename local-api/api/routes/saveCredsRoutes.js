'use strict';
module.exports = function(app) {
  var saveCredentialsController = require('../controllers/saveCredsController');

  // saveCert Routes
  app.route('/cert/save')
    .post(saveCredentialsController.save_credentials);
};