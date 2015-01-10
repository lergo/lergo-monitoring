'use strict';

module.exports = function (grunt) {
    // load all grunt tasks

    var conf = require('../services/conf');

    grunt.task.loadTasks('./lib');

    grunt.initConfig({
        mongoStats: {
            default:{
                options: conf.mongoStats
            }
        },
        storage: {
            mongoStats:{
                options: conf.storage
            }
        }
    });

    grunt.registerTask('default', [
        'mongoStats', 'storage:mongoStats'
    ]);
};
