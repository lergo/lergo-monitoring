//var current_valuation = 0;
//var current_karma = 0;
var current_timestamp = 0;
var diff = require('deep-diff').diff;
var elasticsearch = require('elasticsearch');
var logger = require('log4js').getLogger('mongoStats');
var conf = require('../../../services/conf');
client = new elasticsearch.Client(conf.storage.elasticsearch);

setInterval(function searchelasticsearch() {
    try {
        logger.info('searching data on elasticsearch');
        //var last_valuation = current_valuation;
        //var last_karma = current_karma;
        //current_valuation = Math.floor(Math.random() * 100);
        //current_karma = Math.floor(Math.random() * 200000);
        //
        //send_event('valuation', {current: current_valuation, last: last_valuation});
        //send_event('karma', {current: current_karma, last: last_karma});
        //send_event('synergy', {value: Math.floor(Math.random() * 100)});



        client.search({
            index: 'mongostats',
            body: {
                'sort': [
                    {
                        'timestamp': {'order': 'desc'}
                    }
                ]
            }
        }, function (error, response) {
            logger.info('got response');
            if (!!error) {
                logger.error('unable to query elasticsearch', error);
                return;
            }
            var firstResult = response.hits.hits[0]._source;
            var recent_timestamp = firstResult.timestamp;
            if (recent_timestamp !== current_timestamp) {
                current_timestamp = recent_timestamp;
            try {
                logger.info('sending event');
                //send_event('mongostat', {value: response, text:'guy was here','moreinfo' : 'this is more info'});
                send_event('users', {current: firstResult.collectionStats.users.count});
                logger.info('event sent');
            }catch(e){
                logger.error('unable to send event',e);
            }
            }

        });
    }catch(e){
        logger.error('something went wrong',e);
    }

}, 5 * 1000);



