'use strict';

var deviceDao = require('../dao/deviceDao');
var logger = require('../commons/logger').log;

var registerDevice = function(req, res) {
	
	var deviceDetails = {
		mobile_no: req.body.mobile_no,
		mobile_imei : req.body.mobile_imei
	}
	deviceDao.registerDevice(deviceDetails, function(err,data){
		if(err){
			console.log('deviceController: registerDevice: Error in saving data: error: '+JSON.stringify(err));
			logger.info('deviceController: registerDevice: Error in saving data: error: '+JSON.stringify(err));
			res.status(500).end(JSON.stringify(err));
		}
		else if(data){
			console.log('deviceController: registerDevice: Successfully saved data:'+JSON.stringify(data));
			logger.info('deviceController: registerDevice: Successfully saved data:'+JSON.stringify(data));
			res.json({
				'success':'Device Registered Successfully'
			});
		}
		else{
			//DO nothing
		}
	});
	
}

module.exports = {
	registerDevice: registerDevice
};