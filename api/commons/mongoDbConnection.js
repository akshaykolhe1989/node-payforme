var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/buddypay_app');

var connection = mongoose.connection;

connection.on('error', function() {
	console.log('db connection error');
});

connection.once('open', function() {
  console.log('mongo db connection opened.');
});

module.exports.mongoose = mongoose;