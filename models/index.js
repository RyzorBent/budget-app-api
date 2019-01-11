const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/budgetapp');

mongoose.Promise = Promise;

module.exports.Record = require('./Record');