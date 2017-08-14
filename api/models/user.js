var mongoose = require('../commons/mongoDbConnection').mongoose;
var Schema = mongoose.Schema;
var logger = require('../commons/logger').log;

// create a schema
var userSchema = new Schema({
  mobile_no: { type: Number, required: true, unique: true },
  status_flag: { type: Number, default: 0},
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: {type: Number, required: true},
  created_on: { type: Date, default : new Date() },
  updated_on: { type: Date, default : new Date() } 
});


userSchema.pre('save', function(next) {
	console.log('user : pre-method before save');	
	logger.info('user : pre-method before save');
	if(this.password){
		this.password = new Buffer(this.password).toString('base64');
	}else{
			//No password provided
	}
	
	next();
});

userSchema.pre('update', function(next) {
  console.log('user : pre-method before update');
  logger.info('user : pre-method before update');
  this.update({},{ $set: { updated_on: new Date()} });
  next();
});

userSchema.pre('findOneAndUpdate', function(next) {
  console.log('user : pre-method before findOneAndUpdate');
  logger.info('user : pre-method before findOneAndUpdate');
  this.update({},{ $set: { updated_on: new Date()} });
  next();
}); 

var User = mongoose.model('User', userSchema);

module.exports = User;