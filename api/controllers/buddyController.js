'use strict'

var buddyDao = require('../dao/buddyDao');
var userDao = require('../dao/userDao');
var logger = require('../commons/logger').log;


var addBuddy = function(req,res){
	
	var addBuddyDetails = {
		mobile_no: req.body.mobile_no,
		buddy_mobile_no: req.body.buddy_mobile_no
	}
	
	var buddyMobileNumber = {
		mobile_no: req.body.buddy_mobile_no
	}
	
	userDao.getUser(buddyMobileNumber,function(err,data){

	if(err){
		console.log('buddyController: getUser: Error in geting data: error: '+JSON.stringify(err));
		logger.info('buddyController: getUser: Error in geting data: error: '+JSON.stringify(err));
		res.status(500).end(JSON.stringify(err));
	}
	else if(data && data.length > 0){
				buddyDao.addBuddy(addBuddyDetails, function(err,data){
					if(err)		
					{
						console.log('buddyController: addBuddy: Error in saving data: error: '+JSON.stringify(err));
						logger.info('buddyController: addBuddy: Error in saving data: error: '+JSON.stringify(err));
						res.status(500).end(JSON.stringify(err));
					}
					else if(data)
					{
						console.log('buddyController: addBuddy: Successfully saved data: '+JSON.stringify(data));
						logger.info('buddyController: addBuddy: Successfully saved data: '+JSON.stringify(data));
						
						res.json({
							'success':'Successfully added buddy'
						});
					}
					else{
						console.log('buddyController: getUser: User not found');
						logger.info('buddyController: getUser: User not found');
						res.json({
							'failed':'Buddy not added'
						});
					}
				}); 
	
		}
		else{
			console.log('buddyController: getUser: User not found');
			logger.info('buddyController: getUser: User not found');
			res.json({
							'failed':'Buddy not registered'
						});
		}
	});
}

module.exports = {
	addBuddy: addBuddy
}
