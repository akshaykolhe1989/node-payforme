'use strict'

var mongoose = require('../commons/mongoDbConnection').mongoose;
var Schema = mongoose.Schema;
var logger = require('../commons/logger').log;

var buddySchema =  new Schema({
	mobile_no: {type: Number, required: true, unique: true},
	buddy_mobile_no: {type: Number, required: true, unique: true},
	created_on: {type: Date, default: new Date()},
	updated_on: {type: Date, default: new Date()}
});

buddySchema.pre('update',function(next){
	this.update({},{$set:{updated_on: new Date()}});
	next();
});

var Buddy = mongoose.model('Buddy',buddySchema);

module.exports = Buddy;




