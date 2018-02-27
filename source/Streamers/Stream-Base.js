/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');

/**
* Sucker Stream Reader Base
*/
class Marshaller
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;

		this.internalChunkIndex = 0;
	}

	// djb2 ish hash function
	hashString(pString)
	{
		// This is a great prime but we may want to move to the prime number at 5381.
		// The seed will be larger so faster overflow but also more entropy initially.
		const hashValue = 5381;

		// Count backwards because this is faster in v8
		let tmpCharacterIndex = pString.length;

		while(tmpCharacterIndex)
		{
			// Decrement the character index and multiply it into the hash
			hashValue = (hashValue * 33) ^ pString.charCodeAt(--tmpCharacterIndex);
		}

		// Bit shift it to make it unsigned
		return hashValue >>> 0;
	}

	marshal(pChunk, pChunkMetadata)
	{
		// If there is no passed in metadata, set the source to unknown and use the internal chunk index.
		let tmpChunkMetadata = (typeof(pChunkMetadata) === 'undefined') ? {chunkIndex:this.internalChunkIndex++,chunkSource:'Unknown'} : pChunkMetadata;

		let tmpChunkGUID = `${tmpChunkMetadata.chunkSource}-${tmpChunkMetadata.chunkIndex}`;

		if (this.fable.settings.WriteTraceLogs)
			this.fable.log.trace(`Marshalling chunk ${tmpChunkGUID} from ${tmpChunkMetadata.chunkSource} with default marshaller.`);

		this.fable.sucker.RecordBuffer.pushRecord('RawChunk', tmpChunkGUID, {GUID:tmpChunkGUID,RawData:pChunk});
	}
}


module.exports = Marshaller;