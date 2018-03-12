/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');

/**
* Sucker Chunk Source Base
*/
class ChunkSource
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;

		this.sourceGUID = this.fable.getUUID();
		this.currentSourceIndex = 0;
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
		let tmpChunkMetadata = (typeof(pChunkMetadata) === 'undefined') ? {ChunkSourceIndex:this.currentSourceIndex++,ChunkSourceGUID:this.sourceGUID,ChunkSourceType:'Unknown'} : pChunkMetadata;

		let tmpChunkGUID = `${tmpChunkMetadata.ChunkSourceType}-${tmpChunkMetadata.ChunkSourceGUID}-${tmpChunkMetadata.ChunkSourceIndex}`;

		if (this.fable.settings.WriteTraceLogs)
			this.fable.log.trace(`Marshalling chunk ${tmpChunkGUID} from ${tmpChunkMetadata.chunkSource} with default marshaller.`);

		// By default the marshaller just creates a RawChunk record.
		this.fable.sucker.RecordBuffer.pushRecord('RawChunk', tmpChunkGUID, {GUID:tmpChunkGUID, RawData:pChunk, MetaData:tmpChunkMetadata});
	}
}


module.exports = ChunkSource;