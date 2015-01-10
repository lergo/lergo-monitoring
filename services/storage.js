'use strict';

/**
 * @module storage
 *
 * helps to store stuff on elasticsearch.
 * makes the underlying db abstract so we can replace it in the future.
 *
 */
var config;

var elasticsearch = require('elasticsearch');
var client;
exports.init = function(_config, callback ){
    config = _config;
    client = new elasticsearch.Client(_config);
    callback();
};

/**
 * will append data to storage according to type
 *
 * @param type the type
 * @param data data to keep
 */
exports.add = function(  type , data, callback  ){

    type=type.toLowerCase();
    var storage = type; // keep type and storage the same. this means each type is in different index..

    if ( !callback ){
        callback = function(){}; // noop
    }

    if (!data.hasOwnProperty('timestamp')){
        data.timestamp = new Date().getTime();
    }

    client.indices.create({
        'index' : storage
    }, function(){
        client.create({
            index: storage,
            type: type,
            body: data
        }, callback );
    });

};


/**
 * keeps a single record with data. overrides if data already exists.
 *
 * @param type the type
 * @param data data to keep
 */
exports.put = function( type, data, callback ){
    if ( !callback ){
        callback = function(){};
    }
    var storage = type;
    client.update({
        index: storage,
        type: type,
        id: '1',
        body: data
    },callback);
};