'use strict'

var Device = require('../models/device');
var logger = require('../commons/logger').log;


var registerDevice = function(deviceDetails,callBack){
	var device = new Device(deviceDetails);
	//Device.update(deviceDetails,deviceDetails,{upsert:true},function(err, data){
	device.save(function(err, data){
		if(err){
			console.log('deviceDao:Error in saving data:error: '+err);
			logger.info('deviceDao:Error in saving data:error: '+err);
			callBack(err,null);
		} 
		else if (data){
			console.log('deviceDao:Data saved successfully');
			logger.info('deviceDao:Data saved successfully');
			callBack(null,data);	
		}
		else{
			console.log('deviceDao:Error on saving data');
			logger.info('deviceDao:Error on saving data');
			callBack(err,null);
		}
	});
}

module.exports = {
	registerDevice: registerDevice
}