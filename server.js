require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const paypal = require("paypal-rest-sdk");
const eurekaHelper = require("eureka-helper.js")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}); */

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AQ5TunZNqRBLe-xixbE3nr3qnhx_wPuBhiR_buXeIot7yun7l2EFSdVZYKJ7hL__k8pEePgTzZEUR80P",
  client_secret:
    "EEjn62OMEhiHdCiY2mhFt9NMLr-3pyMngOQwYyZuZnftBDQ6wdMoDMGYTFY_6BSxQZpG3PZBBL5Pv9Gj",
});

// api routes
app.use('/api/users', require('./users/users.controller'));
app.use('/api/history', require('./history/history.controller'));
app.use('/api/pay', require('./pay/pay.controller'));
app.use('/api/project', require('./project/project.controller'));

// global error handler
app.use(errorHandler);

//eureka

/* const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'expressservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    statusPageUrl: 'http://localhost:4000',
    port: {
      '$': 4000,
      '@enabled': 'true',
    },
    vipAddress: 'localhost',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    registerWithEureka: true,
    fetchRegistry: true
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps'
  }
});
//eureka.logger.level('debug');
eureka.start(function (error) {
  console.log(error || 'complete');
}); */

eurekaHelper.registerWithEureka("anim", 4000);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
