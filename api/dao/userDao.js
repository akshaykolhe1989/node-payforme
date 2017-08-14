'use strict'

var User = require('../models/user');
var logger = require('../commons/logger').log;

/*var registerUser  = function(usr,successCallBack,errorCallback){
	
	var user = new User(usr);
	
	user.save(function(err, data){
		if(err){
			console.log('userDao:Error in saving data:error:'+err);
			logger.info('userDao:Error in saving data:error:'+err);
			errorCallback(err);
		} 
		else if (data){
			console.log('userDao:Data saved successfully');
			logger.info('userDao:Data saved successfully');
			successCallBack(data);	
		}
		else{
			console.log('userDao:Error on saving data');
			logger.info('userDao:Error on saving data');
		}
		
	});
} */
var registerUser  = function(usr,callBack){
	
	var user = new User(usr);
	
	user.save(function(err, data){
		if(err){
			console.log('userDao:Error in saving data:error:'+err);
			logger.info('userDao:Error in saving data:error:'+err);
			callBack(err,null);
		} 
		else if (data){
			console.log('userDao:Data saved successfully');
			logger.info('userDao:Data saved successfully');
			callBack(null,data);	
		}
		else{
			console.log('userDao:Error on saving data');
			logger.info('userDao:Error on saving data');
			callBack(err,null);
		}
		
	});
}


/* var activeUser = function(activeUserMobileNumber,successCallBack,errorCallback){
	
	User.findOneAndUpdate(activeUserMobileNumber,{status_flag:1},function(err, data){
		if(err){
			console.log('userDao:Error in activating :error:'+err);
			logger.info('userDao:Error in activating :error:'+err);
			errorCallback(err);
		} 
		else if (data){
			console.log('userDao : activeUser : User activated successfully');
			logger.info('userDao : activeUser : User activated successfully');
			successCallBack(data);	
		}
		else{
			console.log('userDao : activeUser : Do nothing');
			logger.info('userDao : activeUser : Do nothing');
		}
	});
} */

var activeUser = function(activeUserMobileNumber,callBack){
	
	User.findOneAndUpdate(activeUserMobileNumber,{status_flag:1},function(err, data){
		if(err){
			console.log('userDao:Error in activating :error:'+err);
			logger.info('userDao:Error in activating :error:'+err);
			callBack(err,null);
		} 
		else if (data){
			console.log('userDao : activeUser : User activated successfully');
			logger.info('userDao : activeUser : User activated successfully');
			callBack(null,data);
		}
		else{
			console.log('userDao : activeUser : Do nothing');
			logger.info('userDao : activeUser : Do nothing');
			
		}
	});
}


/* var getUser = function(userMobileNumber,successCallBack,errorCallback){
	console.log('userMobileNumber >> '+JSON.stringify(userMobileNumber));
	User.find(userMobileNumber, function(err, data){
		if(err){
			console.log('getUser:Error in fetching user :error:'+err);
			logger.info('getUser:Error in fetching user :error:'+err);
			errorCallback(err);
		}
		else if(data){
			console.log('userDao : getUser : User fetched successfully '+JSON.stringify(data));
			logger.info('userDao : getUser : User fetched successfully');
			successCallBack(data);	
		}
		else{
			console.log('userDao : getUser : Do nothing');
			logger.info('userDao : getUser : Do nothing');
		}
		
	});
} */

var getUser = function(userMobileNumber,callBack){
	
	User.find(userMobileNumber, function(err, data){
		if(err){
			console.log('getUser:Error in fetching user :error:'+err);
			logger.info('getUser:Error in fetching user :error:'+err);
			callBack(err,null);
		}
		else if(data){
			console.log('userDao : getUser : User fetched successfully');
			logger.info('userDao : getUser : User fetched successfully');
			callBack(null,data);	
		}
		else{
			console.log('userDao : getUser : Do nothing');
			logger.info('userDao : getUser : Do nothing');
			callBack(err,null);
		}
		
	});
}

var changePassword = function(userChangePassword,userWithNewPassword,callBack){
	console.log(JSON.stringify(userChangePassword));
	console.log(JSON.stringify(userWithNewPassword));
	User.findOneAndUpdate(userChangePassword,userWithNewPassword, function(err, data){
		if(err){
			console.log('getUser:Error in fetching user :error:'+err);
			logger.info('getUser:Error in fetching user :error:'+err);
			callBack(err,null);
		}
		else if(data){
			console.log('userDao : getUser : User fetched successfully '+JSON.stringify(data));
			logger.info('userDao : getUser : User fetched successfully');
			callBack(null,data);	
		}
		else{
			console.log('userDao : getUser : Do nothing');
			logger.info('userDao : getUser : Do nothing');
			callBack(err,null);
		}
		
	});
}

module.exports = {
	registerUser: registerUser,
	activeUser: activeUser,
	getUser: getUser,
	changePassword: changePassword
}