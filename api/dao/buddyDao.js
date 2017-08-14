'use strict'

var Buddy = require('../models/buddy');
var logger = require('../commons/logger').log;


var addBuddy = function(addBuddyDetails,callBack){
	
	var buddy = new Buddy(addBuddyDetails);
	buddy.save(function(err,data){
		if(err){
			console.log('buddyDao: addBuddy: Error in saving data: '+err);
			logger.info('buddyDao: addBuddy: Error in saving data: '+err);
			callBack(err,null);
		}
		else if(data){
			console.log('buddyDao: addBuddy: Added buddy successfully');
			logger.info('buddyDao: addBuddy: Added buddy successfully');
			callBack(null,data);
		}
		else{
			console.log('buddyDao: Error on saving data');
			logger.info('buddyDao: Error on saving data');
			callBack(err,null);
		}
	});
};


module.exports = {
	addBuddy: addBuddy
}
