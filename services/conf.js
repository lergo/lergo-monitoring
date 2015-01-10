'usr strict';
/**
 * @module conf
 * holds configuration for monitoring scripts.
 *
 * use simply by writing
 *
 * <pre>
 * var conf = require('..path..to/conf');
 * </pre>
 *
 * There are 2 configuration files : prod.json and me.json.<br/>
 * prod.json holds the default values while me.json overrides it.<br/>
 *
 * by default configuration files should be at
 * <pre>
 *     root
 *       +--- prod.json
 *       +--- dev
 *             +--- me.json
 * </pre>
 *
 * However you can override location of me.json simply by exporting environment variable LERGO_MON_CONF
 *
 */
var _ = require('lodash');
var path = require('path');

module.exports = _.merge(require(path.resolve(path.join(__dirname,'..','prod.json'))), require( process.env.LERGO_MON_CONF || path.resolve(path.join(__dirname, '..','dev','me.json' ) )));