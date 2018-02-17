/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');

/**
* Sucker Record Buffer
*/
class RecordBuffer
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;
	}
}


module.exports = RecordBuffer;