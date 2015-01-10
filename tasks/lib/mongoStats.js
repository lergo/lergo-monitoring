'use strict';

/**
 *
 * @module mongoStatsTask
 *
 * @description
 *
 * a grunt task that will invoke mongoStats job. <br/>
 * If job is successfully, it will put `mongoStats` property on grunt.
 *
 */
var logger = require('log4js').getLogger('mongoStatsTask');

module.exports = function( grunt ){
    var job = require('../../jobs/mongoStats.job');
    logger.info('testing');
    grunt.task.registerMultiTask('mongoStats', 'collect mongo statistics.', function(){



        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();

        job.init(options,
            function(){
                job.run( function(){
                    if (!!job.result){
                        // using this method to post data to other tasks.
                        // saw it here: https://github.com/yeoman/grunt-filerev/blob/master/tasks/filerev.js
                        grunt.mongoStats = job.result;
                        grunt.log.ok('mongoStats got result',job.result);
                        job.close(done);
                    }
                });
            }
        );
    });
};