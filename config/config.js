/* Check env */

var env = process.env.NODE_ENV || 'development';

/* Fetch even Config*/

var config = require('./config.json');
var envConfig = config[env];
/* add.env. config value to process.env */
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);