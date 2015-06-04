'use strict';

var expect  = require('chai').expect,
    config  = require('../index');

describe('config-layered', function() {

    it('should load a config from the directory \'config\' when called with no argument', function() {
        expect(config().name).to.equal('config-default');
    });

    it('should return an empty object when loading from an empty config folder', function() {
        expect(config('config-empty')).to.equal({});
    });

    it('should return the exported object from all.js when loading from an config folder containing only an all.js', function() {
        expect(config('config-only-all').name).to.equal('only-all');
    });

    it('should handle a nested config that overwrites a property of all', function() {
        expect(config('config-only-all').name).to.equal('nested');
        expect(config('config-only-all').base).to.equal('all');
    });
});
