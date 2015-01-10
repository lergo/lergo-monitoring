'use strict';
var conf = require('../../dev/me.json');

var services = require('../../services');
var async = require('async');
var logger = require('log4js').getLogger('testDbStats');
var mongoStats = require('../../jobs').mongoStats;
logger.info('mongoStats', mongoStats);
logger.info('conf',conf.mongo);


async.waterfall(
    [
        function initStorage(callback){
            services.storage.init(conf.elasticsearch, callback);
        },
        function initMongoJob( callback ){

            mongoStats.init(conf.mongo, callback);

        },
        function runMongoJob(callback){
            mongoStats.run(function(err, result){
                services.storage.add('mongo', result);
                callback();
            });
        },
        mongoStats.close

    ], function finish(){
        logger.info('finished');
    }
);


