/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');

/**
* Sucker Chunk Queue
*/
class ChunkQueue
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;
	}
}

module.exports = ChunkQueue;