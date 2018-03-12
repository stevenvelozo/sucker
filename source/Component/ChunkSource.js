/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');

/**
* Sucker Chunk Splitter
*/
class ChunkSource
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;
	}

	pushChunk(pChunk, pChunkMetadata, fCallBack)
	{
		if (this.fable.sucker.ChunkQueue.queue.length() < this.fable.settings.ChunkQueueSize)
		{
			return this.fable.sucker.ChunkQueue.pushChunk(pChunk, pChunkMetadata, fCallBack);
		}
		else
		{
			// The queue is flush with records, wait to submit this until it is full.
			if (!this.chunkQueue.paused)
				this.chunkQueue.pause();
		}
	}
}

module.exports = ChunkSource;