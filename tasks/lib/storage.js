'use strict';
/**
 * @module StorageTask
 * @description
 *
 * a grunt task to store data for monitoring report.<br/>
 *
 * This task uses the target as reference to data on `grunt` object. <br/>
 *
 * So if you use is like so
 *
 * <pre>
 * storage: {
 *      myTarget: {
 *      }
 * }
 * </pre>
 *
 * it will search fo `myTarget` on `grunt` object. <br/>
 * If data is not found at that point, it will cause an error.
 *
 */

module.exports = function( grunt ){
    var storage = require('../../services/storage');

    grunt.task.registerMultiTask('storage', 'store information', function(){
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options();

        if (!grunt[this.target]){
            grunt.log.error('unable to find data on grunt.' + this.target);
            done(false);
        }
        storage.init(options.elasticsearch,
            function(){
                storage.add( 'mongoStats', grunt.mongoStats, done);

            }
        );
    });
};