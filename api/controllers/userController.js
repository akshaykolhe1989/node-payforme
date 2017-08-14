'use strict';

var userDao = require('../dao/userDao');
var logger = require('../commons/logger').log;


var registerUser = function(req, res) {
  logger.info('userController : registerUser : Request received : data is: mobile_number: '+req.body.mobile_number+', email: '+req.body.email+', username: '+req.body.username+', password: '+req.body.password);
  
  var mobileNumber = req.body.mobile_no;
  var email = req.body.email;
  var userName = req.body.username;
  var password = req.body.password;
 
  var otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
  
  var user = {
  mobile_no: mobileNumber,
  email: email,
  username: userName,
  password: password,
  otp: otp
  };
  
  userDao.registerUser(user, function(err,data){

	if(err){
		console.log('userController:Error in saving data:'+JSON.stringify(err));
		logger.info('userDao:Error in saving data:error'+JSON.stringify(err));
		res.status(500).end(JSON.stringify(err));
	}
	  else if(data){
		console.log('userController:registerUser:data saved successfully');
		logger.info('userController:registerUser:Data saved successfully');
		res.json({
		'success':'User Registered Successfully. Please use OTP to activate account',
		'otp': otp
	  });
	  }
	  else{
	  
	  }
  
  });
  
}

 var activeUser = function(req,res){
	
	logger.info('userController : activeUser : Request received : Data is : mobile_no:'+ req.body.mobile_no);
	var mobileNumber = req.body.mobile_no;
	var activeUserMobileNumber = {
		mobile_no : mobileNumber
	}
	userDao.activeUser(activeUserMobileNumber,function(err,data){
	
		if(err){
			console.log('userController : Error in activating user : error: '+JSON.stringify(err));
			logger.info('userController : Error in activating user : error : '+JSON.stringify(err));
			res.status(500).end(JSON.stringify(err));
		}
		else if(data){
			console.log('userController : activeUser : User activated'+JSON.stringify(data));
			logger.info('userController : activeUser : User activated');
			res.json({
				'success': 'User activated successfully !!!'
			});
		}
		else{
			//Do Nothing
		}
		});
	
}; 

/* var getUser = function(req, res){
	
	var userMobileNumber = {
		mobile_no: req.body.mobile_no
	}
	userDao.getUser(userMobileNumber,function(data){
		console.log('userController : getUser : User fetched  : data is : '+JSON.stringify(data));
		logger.info('userController : getUser : User fetched  : data is : '+JSON.stringify(data));
		res.status(200).end(JSON.stringify(data));
	
	},function(err){
		console.log('userController : Error in fetching user : error: '+JSON.stringify(err));
		logger.info('userController : Error in fetching user : error : '+JSON.stringify(err));
		res.status(500).end(JSON.stringify(err));
	});
}; */

var getUser = function(req, res){
	
	var userMobileNumber = {
		mobile_no: req.body.mobile_no
	}
	userDao.getUser(userMobileNumber,function(err,data){
		if(err){
			console.log('userController : getUser :Error in fetching user : error: '+JSON.stringify(err));
			logger.info('userController : getUser :Error in fetching user : error : '+JSON.stringify(err));
			res.status(500).end(JSON.stringify(err));
		}
		else if(data){
			console.log('userController : getUser : User fetched  : data is : '+JSON.stringify(data));
			logger.info('userController : getUser : User fetched  : data is : '+JSON.stringify(data));
			res.status(200).end(JSON.stringify(data));
		}
		else{
			res.status(500).end(JSON.stringify({'failed':'User not found'}));
		}
	});
};

var loginUser = function(req,res){
	
	var userMobileNumber = {
		mobile_no: req.body.mobile_no
	}
	console.log("userMobileNumber  >> "+JSON.stringify(userMobileNumber));
	userDao.getUser(userMobileNumber,function(err,data){
		if(err){
			console.log('userController : loginUser :Error in fetching user : error: '+JSON.stringify(err));
			logger.info('userController : loginUser :Error in fetching user : error : '+JSON.stringify(err));
			res.status(500).end(JSON.stringify(err));
		}
		else if(data){
			console.log('userController : loginUser : User fetched  : data is : '+JSON.stringify(data));
			logger.info('userController : loginUser : User fetched  : data is : '+JSON.stringify(data));
			
			var decodedPassword = new Buffer(data[0].password, 'base64').toString('ascii');
			if(data && req.body.password==decodedPassword){
				res.status = 200;
				/* res.json({
					'success': 'User logged in successfully !!!'
				});*/
				var userDetails = {
					"mobile_no" : data[0].mobile_no,
					"email" : data[0].email,
					"username" : data[0].username,
					"status_flag" : data[0].status_flag					
				}
				
				res.json(userDetails);
			}
			else{
				//res.set('Content-Type', 'application/json');
				res.status(500).end(JSON.stringify({'failed':'Invalid Credentials'}));
			}
			
		}
		else{
			res.status(500).end(JSON.stringify({'failed':'User not found'}));
		}
	});
};

var changePassword = function(req,res){

	var mobileNumber =  req.body.mobile_no; 
	var oldPassword =  req.body.old_password;
	var newPassword = req.body.new_password;
	
	if(oldPassword==newPassword){
		console.log('userController : changePassword  : failed : Old and New password must not be same');
		logger.info('userController : changePassword  : failed : Old and New password must not be same');
		res.json({'failed':'Old and New password must not be same'});
	}
	else {
	var userWithOldPassword = {
		mobile_no:req.body.mobile_no,
		password:new Buffer(req.body.old_password).toString('base64')
	}
	var userWithNewPassword = {
		mobile_no:req.body.mobile_no,
		password:new Buffer(req.body.new_password).toString('base64')
	}
	
	userDao.getUser({'mobile_no':req.body.mobile_no},function(err,data){
		
		if(err){
			console.log('userController : changePassword  : getUser : Error in fetching user : error: '+JSON.stringify(err));
			logger.info('userController : changePassword  : getUser : Error in fetching user : error : '+JSON.stringify(err));
		}
		else if(data && data.length > 0){
			console.log('userController : changePassword  : getUser : user fetched successfully : data is : '+JSON.stringify(data));
			logger.info('userController : changePassword  : getUser : user fetched successfully : data is : '+JSON.stringify(data));

			if(data && data.length > 0 && req.body.old_password == new Buffer(data[0].password, 'base64').toString('ascii')){
				userDao.changePassword(userWithOldPassword,userWithNewPassword, function(err,data){
					if(err){
						console.log('userController : changePassword  : changePassword : Error in fetching user : error: '+JSON.stringify(err));
						logger.info('userController : changePassword  : changePassword : Error in fetching user : error : '+JSON.stringify(err));;
						res.status(500).end(JSON.stringify(err));
					}
					else {
						console.log('userController : changePassword  : changePassword : password change successfully');
						logger.info('userController : changePassword  : changePassword : password change successfully');	
						res.json({'success':'password changed successfully !'});
					}
				});
			}
			else if(data && data.length > 0 && req.body.old_password != new Buffer(data[0].password, 'base64').toString('ascii')){
					console.log('userController : changePassword  : changePassword : failed : Incorrect old password');
					logger.info('userController : changePassword  : changePassword : failed : Incorrect old password');
					res.json({'failed':'Incorrect old password'});
			}	
			else{
					//Do Nothing
					console.log('userController : changePassword  : changePassword : failed : User not found');
					logger.info('userController : changePassword  : changePassword : failed : User not found');
					res.json({'failed':'User not found'});
			}
		}
		else{
				console.log('userController : changePassword  : getUser : failed : User not found');
				logger.info('userController : changePassword  : getUser : failed : User not found');
				res.json({'failed':'User not found'});
		}
	});
	}
	
};

var forgetPassword = function(req,res){

	var userMobileNumber = {
		mobile_no: req.body.mobile_no,
	}
	
	var resetPassword = {
		'password' : new Buffer('test#123').toString('base64')
	}
	// Create a message 
	var message = new gcm.Message({
		collapseKey: 'buddypay',
		priority: 'high',
		contentAvailable: true,
		delayWhileIdle: true,
		timeToLive: 3,
		data: {
			password: 'test123',
		},
		notification: {
			title: "Change Buddypay Password",
			body: "Notify change password"
		}
	});


	// Set up the sender with you API key 
	var sender = new gcm.Sender('AIzaSyCiUd0MM1G2yFSLfn3IZac4Vin2Vb-uISM');
	 
	var deviceIdentification = [];
	deviceIdentification.push('enter your device Id here');


	/* Retrying a specific number of times (2) */
	sender.send(message, { registrationTokens: registrationTokens }, 2, function (err, response) {
	  if(err){
		console.log('userController : forgetPassword : response is: '+JSON.stringify(err));
		logger.info('userController : forgetPassword : response is: '+JSON.stringify(err));
	  }
	  else {
		console.log('userController : forgetPassword : response is: '+JSON.stringify(response));
		logger.info('userController : forgetPassword : response is: '+JSON.stringify(response));
		userDao.changePassword(userMobileNumber,resetPassword,function(err,data){
			if(err){
				console.log('userController : forgetPassword : changePassword : err : '+JSON.stringify(err));
				logger.info('userController : forgetPassword : changePassword : err : '+JSON.stringify(err));
			}
			else if(data && data.length > 0){
				console.log('userController : forgetPassword : changePassword : data is : '+JSON.stringify(data));
				logger.info('userController : forgetPassword : changePassword : data is : '+JSON.stringify(data));
			}
			else{
				//Do nothing
			}
		});
	  }   
	});
	
	res.json({'success':'Password will receive soon on you registerd mobile number'});
	
}

module.exports = {
  registerUser: registerUser ,
  activeUser: activeUser,
  getUser: getUser,
  loginUser: loginUser,
  changePassword: changePassword
};