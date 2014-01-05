'use strict';

// import mongoose helpers
var utils = require('../utils');
var should = require('should');
// import our user mongoose model
var User = require('../../user/models').User;

describe('Users: models', function() {

    describe('#create()', function() {
        it('should create a new User', function(done) {
            // Create a User object to pass to User.create()
            var u = {
                name: {
                    givenName: 'Barack',
                    familyName: 'Obama'
                },
                // new attributes
                emails: [{
                    type: 'home',
                    value: 'home@example.com'
                }, {
                    type: 'work',
                    value: 'work@example.com'
                }]
            };
            User.create(u, function(err, createdUser) {
                // Confirm that that an error does not exist
                should.not.exist(err);
                // verify that the returned user is what we expect
                createdUser.name.givenName.should.equal('Barack');
                createdUser.name.familyName.should.equal('Obama');
                // new tests
                createdUser.emails[0].type.should.equal('home');
                createdUser.emails[0].value.should.equal('home@example.com');
                createdUser.emails[1].type.should.equal('work');
                createdUser.emails[1].value.should.equal('work@example.com');
                // Call done to tell mocha that we are done with this test
                done();
            });
        });
    });

  describe('#hashPassword()', function() {
    it('should return a hashed password asynchronously', function(done) {
      var password = 'secret';
      User.hashPassword(password, function(err, passwordHash) {
        // Confirm that the passwordHash is not null
        should.exist(passwordHash);
        done();
      });
    });
  });

  describe('#comparePasswordAndHash()', function() {
    it('should return true if password is valid', function(done){
      var password = 'secret';
      // create a password hash
      User.hashPassword(password, function(err, passwordHash) {
        // confirm error does not exist
        User.comparePasswordAndHash(password, passwordHash, function(err, areEqual) {
          // Confirm that an error doesn't exist
          should.not.exist(err);
          // Confirm that areEqual is 'true'
          areEqual.should.equal(true);
        
          done();
        });
      });
    });

    it('should return false if password is invalid', function(done) {
      var password = 'secret';

      // create a password hash
      User.hashPassword(password, function(err, passwordHash) {
        var fakePassword = 'imahacker';

        // confirm an error does not exist
        User.comparePasswordAndHash(fakePassword, passwordHash, function(err, areEqual) {
          // confirm error does not exist
          should.not.exist(err);
          // confirm that the areEqual is false
          areEqual.should.equal(false);
          done();
        });
      });
    });

  });

});
