'use strict';

var assert = require('assert');
var Conf = require('../index');

function withEnv(env, cb) {
  for (var key in env) {
    process.env[key] = env[key];
  }
  cb();
  for (var key in env) {
    delete process.env[key];
  }
}

function withProduction(cb) {
  return withEnv({ NODE_ENV: 'production' }, cb);
}

describe('Configuration API', function() {

  it('should detect production environment', function() {
    assert.equal(new Conf().production, false);
    withProduction(function() {
      assert.equal(new Conf().production, true);
    });
  });

  it('should override properties via the development object', function() {
    var conf = new Conf({
      port: 1234,
      development: {
        port: 4321
      }
    });
    assert.equal(conf.port, 4321);
  });

  it('should ignore development object in production', function() {
    withProduction(function() {
      var conf = new Conf({
        port: 1234,
        development: {
          port: 4321
        }
      });
      assert.equal(conf.port, 1234);
    });
  });

  it('should override key-wise values in development/production', function() {
    var conf = new Conf({
      port: {
        development: 2222,
        production: 3333
      }
    });
    assert.equal(conf.port, 2222);
    withProduction(function() {
      conf = new Conf({
        port: {
          development: 2222,
          production: 3333
        }
      });
      assert.equal(conf.port, 3333);
    });
  });

  it('should deflate nested objects', function() {
    var conf = new Conf({
      test: {
        host: {
          development: 'test.sandbox',
          production: 'test.live'
        }
      }
    });
    assert.equal(conf.test.host, 'test.sandbox');
    withProduction(function() {
      var conf = new Conf({
        test: {
          host: {
            development: 'test.sandbox',
            production: 'test.live'
          }
        }
      });
      assert.equal(conf.test.host, 'test.live');
    });
  });

  it('should leave arrays untouched', function() {
    var conf = new Conf({
      array: ['one', 'two', 'three']
    });
    assert.equal(Array.isArray(conf.array), true);
  });

});
