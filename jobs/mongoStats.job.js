'use strict';
var conf;
var _ = require('lodash');
var logger = require('log4js').getLogger('publicMongoStats');
var async = require('async');
var db;
var data = {
    'indexesCollection' : 'system.indexes',
    'collectionStats' : {}
};

exports.init = function(_conf, callback){
    conf = _conf;

    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(conf.url, function(err, _db) {

        if ( !!err ){
            callback(err);
            return;
        }
        logger.info('Connected correctly to server');
        db = _db;
        callback();
    });
};

function getDbStats( callback ){
    db.stats(function( err, data ){
        if ( !!err ){
            logger.error('error while getting db stats',err);
            callback(err);
            return;
        }
        data.dbStats = data;
        callback();
    });
}

function getCollections( callback ){
    db.listCollections().toArray(function(err, items){
        if ( !!err ){
            logger.error('unable to get collections',err);
            callback(err);
        }
        data.collections = [];
        _.each(items, function( item ){
             data.collections.push(item.name.substring(item.name.indexOf('.') +1));
        });
        callback();
    });

}

function getStatsPerCollection( callback ){
    logger.trace('getting stats per collection');
    async.each(data.collections, function(collectionName, callback ){
        var collection = db.collection(collectionName);
        collection.stats(function(err, stats){
            if ( !!err ){
                logger.error('unable to get collection stats',err);
                callback(err);
                return;
            }
            data.collectionStats[collectionName] = stats;
            callback();
        });
    }, callback );
}

function getIndexes( callback ){

    var collection = db.collection(data.indexesCollection);
    collection.find().toArray(function(err, result){
        if ( !!err ){
            logger.warn('error when getting indexes', err);
        }
        data.indexes = result;
        callback(null);
    });
}

exports.run = function(callback){
    logger.info('running');


    async.waterfall(
        [
            getDbStats,
            getCollections,
            getStatsPerCollection,
            getIndexes
        ],
        function(){
            exports.result = data;
            callback(null, data);
        }
    );


};

exports.close = function(callback){
    logger.info('closing');
    db.close(callback);
};
