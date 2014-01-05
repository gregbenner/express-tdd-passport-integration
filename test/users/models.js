'use strict';

// import mongoose helpers

var utils = require('../utils');
var should = require('should');
// import our user mongoose model
var User = require('../../users/models').User;

describe('Users: models', function() {

  describe('#create()', function() {
    it('should create a new User', function(done) {
      // create a user object to pass to User.create();
      var newUser = {
        name: {
          givenName: 'Barack',
          familyName: 'Obama'
        }
      };

      User.create(newUser, function(err, createdUser) {
        // confirm does not exist already
        should.not.exist(err);
        // verify that user returned is the correct one
        createdUser.name.givenName.should.equal('Barack');
        createdUser.name.familyName.should.equal('Obama');
        // call done to confirm tests are done
        done();
      });
    });
  });
});