'use strict';

var config = require('../config');
var mongoose = require('mongoose');

// ensure NODE_ENV is set to test

process.env.NODE_ENV = 'test';

beforeEach(function(done) {
  function clearDb() {
    for(var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function(){});
    }
    return done();
  }

  if(mongoose.connections.readyStat === 0) {
    mongoose.connect(config.db.test, function(err) {
      if(err) throw err;
      return clearDb();
    });
  }  else {
    return clearDb();
  }
});

afterEach(function(done) {
  mongoose.disconnect();
  return done();
});