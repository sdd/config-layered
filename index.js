'use strict';
var path = require('path'),
    _    = require('lodash');

var envs = (process.env.NODE_ENV || 'dev').split('-');

module.exports = function(dir, options) {
	dir = dir || 'config';

	var defaults = {
		base: 'all'
	};
	var opt      = _.extend(defaults, options);

	var test = process.env.NODE_ENV == 'test-configLayered';

	var baseConfig = {};
	var basePath   = path.join(__dirname, test ? 'test' : '..', test ? '' : '..', dir, opt.base);
	try {
		baseConfig = require(basePath);
	} catch (e) {
		console.log('Missing config file: \'' + basePath + '.js\'');
	}

	return _.reduce(envs,
		function(acc, env, idx, envs) {

			var nextLayer = envs.slice(0, idx + 1).join('-');

			var confPath = path.join(__dirname, test ? 'test' : '..', test ? '' : '..', dir, nextLayer);
			try {
				acc = _.merge(acc, require(confPath));
			} catch (e) {
				console.log('Missing config file ' + confPath);
			}
			return acc;
		},
		baseConfig
	);
};
