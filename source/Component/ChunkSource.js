/**
* @license MIT
* @author <steven@velozo.com>
*/

/**
* Sucker Chunk Source Base
*/
class ChunkSource
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;

		this.running = false;

		this.sourceType = 'Unknown';

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
			// Decrement the character index and multiply it into the hash
			hashValue = (hashValue * 33) ^ pString.charCodeAt(--tmpCharacterIndex);

		// Bit shift it to make it unsigned
		return hashValue >>> 0;
	}


	start()
	{
		if (this.running)
		{
			this.fable.log.trace(`Chunk Source Stream ${this.sourceType}::${this.sourceGUID}#${this.currentSourceIndex} attempting to [START] but is already running.`);
			return false;
		}

		if (this.fable.settings.WriteTraceLogs)
			this.fable.log.trace(`Chunk Source Stream ${this.sourceType}::${this.sourceGUID}#${this.currentSourceIndex} [START].`);

		this.running = true;
		return true;
	}

	continue()
	{
		if (this.running)
		{
			this.fable.log.trace(`Chunk Source Stream ${this.sourceType}::${this.sourceGUID}#${this.currentSourceIndex} attempting to [CONTINUE] but is already running.`);
			return false;
		}

		if (this.fable.settings.WriteTraceLogs)
			this.fable.log.trace(`Chunk Source Stream ${this.sourceType}::${this.sourceGUID}#${this.currentSourceIndex} [CONTINUE].`);

		this.running = true;
		return true;
	}

	pause()
	{
		if (this.running)
		{
			this.fable.log.trace(`Chunk Source Stream ${this.sourceType}::${tmpChunkGUID} attempting to [PAUSE] but is not running.`);
			return false;
		}

		if (this.fable.settings.WriteTraceLogs)
			this.fable.log.trace(`Chunk Source Stream ${this.sourceType}::${tmpChunkGUID} [PAUSE].`);

		this.running = false;
		return true;
	}

	pushChunk(pChunk, pChunkMetadata, fCallBack)
	{
		if (this.fable.sucker.ChunkQueue.queue.length() < this.fable.settings.ChunkQueueSize)
		{
			return this.fable.sucker.ChunkQueue.pushChunk(pChunk, libUnderscore.extend(
					{
						ChunkSourceIndex: ++this.sourceStream.currentSourceIndex,
						ChunkSourceGUID: this.sourceStream.sourceGUID,
						// Chunk Marshallers can either be taken from the GUID of a specific source, or a ChunkSourceType
						// The sucker library will keep them by GUID in the ChunkSource object, but will index the Types to the last instantiated type of that Chunk Source type.
						// Types: GUID, Type, Hash
						ChunkMarshallerSourceType: 'GUID',
						ChunkMarshallerSource: this.sourceGUID
					}, pChunkMetadata), fCallBack);
		}
		else
		{
			// The queue is flush with records, wait to submit this until it is full.
			if (!this.fable.sucker.ChunkQueue.paused)
				this.fable.sucker.ChunkQueue.pause();
		}
	}

	marshal(pChunk, pChunkMetadata)
	{
		// If there is no passed in metadata, set the source to unknown and use the internal chunk index.
		let tmpChunkMetadata = (typeof(pChunkMetadata) === 'undefined') ? {ChunkSourceIndex:this.currentSourceIndex,ChunkSourceGUID:this.sourceGUID,ChunkSourceType:'Unknown'} : pChunkMetadata;

		let tmpChunkGUID = `${tmpChunkMetadata.ChunkSourceType}-${tmpChunkMetadata.ChunkSourceGUID}-${tmpChunkMetadata.ChunkSourceIndex}`;

		if (this.fable.settings.WriteTraceLogs)
			this.fable.log.trace(`Marshalling chunk ${tmpChunkGUID} from ${tmpChunkMetadata.chunkSource} with default marshaller.`);

		// By default the marshaller just creates a RawChunk record.
		this.fable.sucker.RecordBuffer.pushRecord('RawChunk', tmpChunkGUID, {GUID:tmpChunkGUID, RawData:pChunk, MetaData:tmpChunkMetadata});
	}
}


module.exports = ChunkSource;