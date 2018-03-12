/**
* @license MIT
* @author <steven@velozo.com>
*/
/**
* Load a mapping JSON object
*/
class MappingLoader
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;

		// The prototype mapping object, which can be altered by API consumers.
		this.fable.sucker.MappingPrototype = require('Sucker-MappingPrototype.json');
	}

	load(pMapping)
	{
	}
}

module.exports = ChunkSource;