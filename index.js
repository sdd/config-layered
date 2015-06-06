'use strict';
var path = require('path'),
    assign = require('lodash.assign'),
    merge = require('lodash.merge'),
    reduce = require('lodash.reduce');

var envs = (process.env.NODE_ENV || 'dev').split('-');

module.exports = function(dir, options) {
	dir = path.join(process.cwd(), dir || 'config');

	var defaults = {
		base: 'all',
		logMissing: false
	};
	var opt = assign(defaults, options);

	var baseConfig = {};
	var basePath   = path.join(dir, opt.base);

	try {
		baseConfig = require(basePath);
	} catch (e) {
		opt.logMissing && console.error('Missing config file: \'' + basePath + '.js\'');
	}

	return reduce(envs,
		function(acc, env, idx, envs) {

			var nextLayer = envs.slice(0, idx + 1).join('-');

			var layerPath = path.join(dir, nextLayer);
			try {
				acc = merge(acc, require(layerPath));
			} catch (e) {
				opt.logMissing && console.error('Missing config file: \'' + layerPath + '.js\'');
			}
			return acc;
		},
		baseConfig
	);
};
