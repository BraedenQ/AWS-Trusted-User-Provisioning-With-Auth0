const fs = require('fs');

exports.save_credentials = function(req, res) {
    fs.writeFile("../credentials/cert.pem", req.body.certificate, function(err) {
        if (err){
            res.send(err);
        }
        console.log("The certificate was saved!");
    }); 
    fs.writeFile("../credentials/privateKey.pem", req.body.privateKey, function(err) {
        if (err){
            res.send(err);
        }
        else{
            res.json("Saved!");
        }
        console.log("The private key was saved!");
    });
    return res;
};