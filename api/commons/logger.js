var bunyan = require('bunyan');
var log = bunyan.createLogger({
	name:'buddypay',
	streams:[
	/*{
	stream: process.stdout ,
	level: 'info'
	},*/
	{
      level: 'error',
      path: './logs/buddypay-error.log'  // log ERROR and above to a file 
    },
	{
      level: 'info',
      path: './logs/buddypay-info.log'  // log info and above to a file 
    }
	]
	
	
});

module.exports = {
log: log
};