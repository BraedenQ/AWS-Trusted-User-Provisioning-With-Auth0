'use strict';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports.createThingAndCredentials = async function (event) {
    var AWS = require('aws-sdk');
    var iot = new AWS.Iot();
    
    
    // create credentials
    var params = {
      setAsActive: false
    };
    var createKeysAndCertificate = iot.createKeysAndCertificate(params).promise();
    var responseData = await createKeysAndCertificate.then(function(data) {
      console.log('Success');
      return data;
    }).catch(function(err) {
      console.log(err);
    });


    // save creds
    var certificate = responseData.certificatePem;
    var privateKey = responseData.keyPair.PrivateKey;
    var publicKey = responseData.keyPair.PublicKey;
    var certificateArn = responseData.certificateArn;
    var certificateId = responseData.certificateId;
    
    var demoPolicyName = 'Auth0Device-Policy';
    var demoThingName = 'Auth0Device-' + getRandomInt(100000000).toString();
    
    // create thing
    var params2 = {
      thingName: demoThingName, //req
    };
    
    var createThing =  iot.createThing(params2).promise();
    await createThing.then(function(data) {
      console.log('Thing created.');
      return data;
    }).catch(function(err) {
      console.log(err);
    });
    
    
    // attach policy to cert
    var params3 = {
      policyName: demoPolicyName, // req
      principal: certificateArn // req
    };
    var attachPolicy =  iot.attachPrincipalPolicy(params3).promise();
    await attachPolicy.then(function(data) {
      console.log('Policy attached.');
      //return data;
    }).catch(function(err) {
      console.log(err);
    });
    
    // attach cert to thing
    var params4 = {
      principal: certificateArn, // req
      thingName: demoThingName // req
    };
    var attachCert =  iot.attachThingPrincipal(params4).promise();
    await attachCert.then(function(data) {
      console.log('Cert attached.');
      //return data;
    }).catch(function(err) {
      console.log(err);
    });
    
    
    
    //===============
    
    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Required for CORS support to work
          'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS,
          'Access-Control-Allow-Methods' : 	'POST, OPTIONS',
          'Access-Control-Allow-Headers' : 'Content-Type,X-Amz-Date,Authorization,x-api-key,x-amz-security-token'
        },
        body: responseData

    };
    return response;
    
    
};
