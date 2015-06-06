'use strict';

var chai    = require('chai'),
	expect  = chai.expect,
    sinon   = require('sinon'),
    config  = require('../index');

chai.use(require('sinon-chai'));

describe('config-layered', function() {

    it('should load a config from the directory \'config\' when called with no argument', function() {
        expect(config().name).to.equal('config-default');
    });

    it('should return an empty object when loading from an empty config folder', function() {
        expect(config('config-empty')).to.be.an('object');
        expect(config('config-empty')).to.be.empty;
    });

    it('should return the exported object from all.js when loading from an config folder containing only an all.js', function() {
        expect(config('config-only-all').name).to.equal('only-all');
    });

    it('should handle a nested config that overwrites a property of all', function() {
        expect(config('config-nested').name).to.equal('nested');
        expect(config('config-nested').base).to.equal('all');
    });

	it('should log to console if opts.logMissing is true and a config file is missing', function() {
		var consoleSpy = sinon.spy(console, 'error');
		config('config-empty', { logMissing: true  });

		expect(consoleSpy).to.always.have.been.calledWithMatch(/Missing config file/);
		expect(consoleSpy).to.have.been.calledTwice;
	});
});
