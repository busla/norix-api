/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */
 
var
  jwt = require('jsonwebtoken'),
  tokenSecret = "psilocybin";

// Generates a token from supplied payload
module.exports.issue = function(payload, cb) {
  
  cb(null, jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
      expiresInMinutes : 525949 // Token expire time is 1 year
    }
  ));
};

// Verifies token on a request
module.exports.verify = function(token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
  );
};