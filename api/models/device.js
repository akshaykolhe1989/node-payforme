var mongoose = require('../commons/mongoDbConnection').mongoose;
var Schema = mongoose.Schema;
var logger = require('../commons/logger').log;

// create a schema
var deviceSchema = new Schema({
  mobile_no: { type: Number, required: true, unique: true },
  mobile_imei: { type: String, required: true, unique: true },
  created_on: { type: Date, default : new Date() },
  updated_on: { type: Date, default : new Date() } 
});



deviceSchema.pre('update', function(next) {
  console.log('device : pre-method before update');
  logger.info('device : pre-method before update');
    
  //this.update({},{ $set: { updated_on: new Date()} });
  next();
});

deviceSchema.pre('findOneAndUpdate', function(next) {
  console.log('device : pre-method before findOneAndUpdate');
  logger.info('device : pre-method before findOneAndUpdate');
  this.update({},{ $set: { updated_on: new Date()} });
  next();
}); 

var Device = mongoose.model('Device', deviceSchema);

module.exports = Device;