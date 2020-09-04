'use strict';

function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
  });
}
module.exports.associateDeviceToUser = function(event, context) {
    const AWS = require('aws-sdk'); 
    var dynamodb = new AWS.DynamoDB();
    var thingName = event.detail.requestParameters.thingName;
    console.log("Associating " + thingName + " to a user.");
    var params = {
     Item: {
      "device_id": {
        S: createUUID()
       }, 
       "device_name": {
        S: thingName
       }, 
      "user_id": {
        S: "1"
       }
     }, 
     ReturnConsumedCapacity: "TOTAL", 
     TableName: "devices"
    };
    dynamodb.putItem(params, function(err, data) {
      if (err){
       console.log(err, err.stack); // an error occurred
      }
      else{
        let response = {
             statusCode: '200',
             body: 'Success!',
             headers: {
                 'Content-Type': 'application/json',
             }
         };
         context.succeed(response);
      }     
    });
   
};