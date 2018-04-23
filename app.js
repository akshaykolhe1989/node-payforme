'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var logger = require('./api/commons/logger').log;
var requestFilter = require('./api/filters/requestFilter');
var bodyparser = require('body-parser');
module.exports = app; // for testing

app.use(bodyparser.json());

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress){
  if (err) { throw err; }

  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  // Install middleware for request filter
  app.use('*',function(req,res,next){
  requestFilter.filter(req,res,next)
  });
  
  swaggerExpress.register(app);

  var port = process.env.PORT || 9000;
  app.listen(port);
  console.log('app : Server running successfully on '+port+'... ');
});
