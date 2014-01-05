'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Constants
var BCRYPT_COST = 12;

var emailSchema = new Schema({
  type: {type: String},
  value: String
});

// define the userSchema
var userSchema = new Schema({
 name  : {
   givenName   : String,
   familyName  : String
 },
 emails: [emailSchema],
 passwordHash: String
});

userSchema.statics.comparePasswordAndHash = function(password, passwordHash, fn) {
  // compare the password to the passwordHash
  bcrypt.compare(password, passwordHash, fn);
};

userSchema.statics.hashPassword = function(passwordRow, fn) {
  // to speed up tests we do a NODE_ENV check
  // if we are in test environment we set BCRYPT = 1
  if(process.env.NODE_ENV === 'test') BCRYPT_COST = 1;
  // encrypt the password, pass the callback function
  bcrypt.hash(passwordRow, BCRYPT_COST, fn);
};


// Export the User model
exports.User = mongoose.model('User', userSchema);