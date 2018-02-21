/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');

/**
* Sucker Entity Cache
*/
class EntityCache
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;

		this.cacheData = {};
	}

	// Add an entity record 
	add(pEntity, pGUID, pRecord)
	{
		if (typeof(this.cacheData[pEntity]) !== 'object')
			this.cacheData[pEntity] = {};

		this.cacheData[pEntity][pGUID] = pRecord;
	}

	read(pEntity, pGUID)
	{
		if (typeof(this.cacheData[pEntity]) !== 'object')
			return false;

		if (typeof(this.cacheData[pEntity][pGUID]) !== 'object')
			return false;

		return this.cacheData[pEntity][pGUID];
	}

	clear()
	{
		this.cacheData = {};

		return true;
	}

	clearEntity(pEntity)
	{
		if (typeof(this.cacheData[pEntity]) !== 'object')
			return false;

		this.cacheData[pEntity] = {};

		return true;
	}
}


module.exports = EntityCache;