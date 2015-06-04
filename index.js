'use strict';

var _  = require('lodash');

var envs = (process.env.NODE_ENV || 'dev').split('-');

module.exports = function(dir, options) {
    dir = dir || './config';

    var defaults = {
        base: 'all',
        separator: '/'
    };
    var opt = _.extend(defaults, options);

    var baseConfig = {};
    try{
        baseConfig = require(dir + opt.separator + opt.base);
    } catch (e) {
        console.log('Missing config file: \'' + dir + opt.separator + opt.base + '.js\'');
    }

    return _.reduce(envs,
        function (acc, env, idx, envs) {

            var nextLayer = envs.slice(0, idx + 1).join('-');

            try {
                acc = _.merge(acc, require(dir + opt.separator + nextLayer));
            } catch (e) {
                console.log('Missing config file ' + nextLayer);
            }
            return acc;
        },
        baseConfig
    );
};
