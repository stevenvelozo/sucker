/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');

/**
* Sucker Data Marshaller
*/
class Marshaller
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;
	}

	marshal(pChunk, pChunkMetadata)
	{
		var tmpChunkMetadata = (typeof(pChunkMetadata) === 'undefined') ? {} : pChunkMetadata;

		this.fable.log.trace('Marshalling chunk with default marshaller.');

		this.fable.sucker.RecordBuffer.
	}
}


module.exports = Marshaller;