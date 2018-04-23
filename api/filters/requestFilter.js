var async = require('async');
var logger = require('../commons/logger').log;
var userDao = require('../dao/userDao');

const skipInactiveUsersValidateRegExp =
/v[0-9]+\.[0-9]{0,2}\/\b(buddypay\/users\/registerUser)\b[^\/]*/ ;


var filter = function(req,res,next){
	
	
	async.parallel({
		first: function(callback){
			// Later you can introduce your method call here, For e:g methodNameFirst(req,res,callback){...}
			console.log('requestFilter : first');
			callback(null,'first');	
		},
		second: function(callback){
			 // Later you can introduce your method here, For e:g methodNameSecond(req,res,callback){...} 
			 console.log('requestFilter : second');
			callback(null,'second');
		}
	},function(err,result){
		if(err){
			console.log('requestFilter : callback : Error : '+err);
			logger.info('requestFilter : callback : Error : '+err);
		}
		else if(result){
			console.log('requestFilter : callback : result : '+JSON.stringify(result));
			logger.info('requestFilter : callback : result : '+JSON.stringify(result));
			callBackFilter(req,res,next);
		}
		else{
			consile.log('requestFilter : callback : Do nothing');
			logger.info('requestFilter : callback : Do nothing');
		}
		
	});
	
};



var callBackFilter =  function(req, res, next){
	
	
	//console.log(skipInactiveUsersValidateRegExp.test(req.originalUrl.split("?")[0]));
	if(req.originalUrl.match('\/v[^/]*\/buddypay\/users\/activeUser')){
			var userMobileNumber  = {
				mobile_no : req.body.mobile_no,
			}

			console.log('active user req - requested user:'+JSON.stringify(req.body));
			userDao.getUser(userMobileNumber,function(err,data){

					if(err){
						console.log('requestFilter : callBackFilter : skipInactiveUsersValidateRegExp : err : '+JSON.stringify(err));
						logger.info('requestFilter : callBackFilter : skipInactiveUsersValidateRegExp : err : '+JSON.stringify(err));
						res.status(500).end(JSON.stringify(err));
					}
					else if(data && data.length > 0){
						if(data[0].status_flag == 1){
							res.status(500).end(JSON.stringify({'failed':'User is already activated'}));
						}
						else if(data[0].otp == req.body.otp){
							next();
						}
						else{
							res.status(500).end(JSON.stringify({'failed':'Incorrect OTP'}));
						}
					}
					else{
						//Do Nothing
						res.status(500).end(JSON.stringify({'failed':'User not register yet. Please register the user first'}));
					}
					
			});
	}
// To check whether user is active or not for every request and skip the Registration part 
	else if(!skipInactiveUsersValidateRegExp.test(req.originalUrl.split("?")[0])){
				
			console.log('requestFilter : callBackFilter : skipInactiveUsersValidateRegExp : url : '+req.originalUrl);
			logger.info('requestFilter : callBackFilter : skipInactiveUsersValidateRegExp : url : '+req.originalUrl);	
			
			var userMobileNumber  = {
				mobile_no : req.body.mobile_no
			}
			
			userDao.getUser(userMobileNumber,function(err,data){
					if(err){
							console.log('requestFilter : callBackFilter : skipInactiveUsersValidateRegExp : err : '+JSON.stringify(err));
							logger.info('requestFilter : callBackFilter : skipInactiveUsersValidateRegExp : err : '+JSON.stringify(err));
							res.status(500).end(JSON.stringify(err));
					}
					else if(data && data.length > 0){
							console.log('requestFilter : callBackFilter : skipInactiveUsersValidateRegExp : data : '+JSON.stringify(data));
							logger.info('requestFilter : callBackFilter : skipInactiveUsersValidateRegExp : data : '+JSON.stringify(data));
							if(data[0].status_flag==1){
								next();
							}
							else if(data[0].status_flag==0){
								res.status(500).end(JSON.stringify({'failed':'User not activated yet. Please activate the user first'}));
							}
							else{
								res.status(500).end(JSON.stringify({'failed':'User not register yet. Please register the user first'}));
							}
					}
					else{
						res.status(500).end(JSON.stringify({'failed':'User not register yet. Please register the user first'}));
					}

			});
			
	}
	else{
		console.log('requestFilter : callBackFilter : url : '+req.originalUrl);
		logger.info('requestFilter : callBackFilter : url : '+req.originalUrl);	
		next();
	}
}
module.exports = {
	filter: filter
}