'use strict';
var path = require('path'),
    assign = require('lodash.assign'),
    merge = require('lodash.merge'),
    reduce = require('lodash.reduce');

var envs = (process.env.NODE_ENV || 'dev').split('-');

module.exports = function(dir, options) {
	dir = dir || 'config';

	var defaults = {
		base: 'all'
	};
	var opt = assign(defaults, options);

	var baseConfig = {};
	var basePath   = path.join(__dirname, test ? 'test' : '..', test ? '' : '..', dir, opt.base);
	try {
		baseConfig = require(basePath);
	} catch (e) {
		console.log('Missing config file: \'' + basePath + '.js\'');
	}

	return reduce(envs,
		function(acc, env, idx, envs) {

			var nextLayer = envs.slice(0, idx + 1).join('-');

			var confPath = path.join(__dirname, test ? 'test' : '..', test ? '' : '..', dir, nextLayer);
			try {
				acc = merge(acc, require(layerPath));
			} catch (e) {
				console.log('Missing config file ' + confPath);
			}
			return acc;
		},
		baseConfig
	);
};
