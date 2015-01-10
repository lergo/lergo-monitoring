/**
 * @module services
 * a collection of services to use.
 *
 * use this collection simply by running
 *
 * <pre>
 *     var services = require('path/to/services/folder');
 *     services.conf ==> to use the configuration service
 * </pre>
 */
exports.conf = require('./conf');
exports.storage = require('./storage');