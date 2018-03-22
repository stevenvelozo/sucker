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
	constructor(pSucker)
	{
		this.fable = pSucker.Fable;
		//this.webserver = pWebServer;

		this.recordCache = {};
		this.metaData = {};
	}

	checkEntity(pEntity)
	{
		// Check if the entity type exists in the cache yet
		if (typeof(this.recordCache[pEntity]) !== 'object')
			this.recordCache[pEntity] = {};

		// Check if the entity type exists in the metadata object yet
		if (typeof(this.metaData[pEntity]) !== 'object')
			this.metaData[pEntity] = {};

		return true;
	}

	add(pEntity, pGUID, pRecord, pRecordMetadata)
	{
		this.checkEntity(pEntity);

		// Always overwrite the record on an add operation
		this.recordCache[pEntity][pGUID] = pRecord;

		// Set the record metadata as well.
		this.setMetadata(pRecordMetadata);

		return true;
	}

	merge(pEntity, pGUID, pRecord, pRecordMetadata)
	{
		this.checkEntity(pEntity);

		// Check if a record exists for this particular guid
		if (!this.recordCache[pEntity].hasOwnProperty(pGUID))
			this.recordCache[pEntity][pGUID] = {};

		// Always merge metadata
		libUnderscore.extend(this.recordCache[pEntity][pGUID], (typeof(pRecord) === 'undefined') ? {} : pRecord);

		return true;
	}

	read(pEntity, pGUID)
	{
		if (typeof(this.recordCache[pEntity]) !== 'object')
			return false;

		if (typeof(this.recordCache[pEntity][pGUID]) !== 'object')
			return false;

		return this.recordCache[pEntity][pGUID];
	}

	setMetadata(pEntity, pGUID, pRecordMetadata)
	{
		this.checkEntity(pEntity);

		// Check if metadata exists for this particular guid
		if (!this.metaData[pEntity].hasOwnProperty(pGUID))
			this.metaData[pEntity][pGUID] = {};

		// Always merge metadata
		libUnderscore.extend(this.metaData[pEntity][pGUID], (typeof(pRecordMetadata) === 'undefined') ? {} : pRecordMetadata);

		return true;
	}

	readMetadata(pEntity, pGUID)
	{
		if (typeof(this.metaData[pEntity]) !== 'object')
			return false;

		if (typeof(this.metaData[pEntity][pGUID]) !== 'object')
			return false;

		return this.metaData[pEntity][pGUID];
	}

	clear()
	{
		this.recordCache = {};

		return true;
	}

	clearEntity(pEntity)
	{
		if (typeof(this.recordCache[pEntity]) !== 'object')
			return false;

		this.recordCache[pEntity] = {};

		return true;
	}
}


module.exports = EntityCache;