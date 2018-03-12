/**
* @license MIT
* @author <steven@velozo.com>
*/
var libAsync = require('async');

/**
* Sucker Chunk Queue
*/
class ChunkQueue
{
	constructor(pFable, pWebServer)
	{
		this.fable = pFable;
		this.webserver = pWebServer;

		this.currentChunkIndex = 0;

		this.chunkQueue = libAsync.queue(
			(pTaskData, fCallBack)=>
			{
				this.fable.sucker.Marshaller.marshal(pTaskData.Chunk,pTaskData.Metadata);
				fCallBack();
			}
		);

		this.chunkQueue.concurrency = this.fable.settings.ChunkQueueParallel;
	}

	pushChunk(pChunk, pChunkMetadata, fCallBack)
	{
		return this.chunkQueue.push({Chunk:pChunk, Metadata: libUnderscore.extend({ChunkIndex:++this.currentChunkIndex}, pChunkMetadata}), fCallBack);
	}

	queue(pChunk,pChunkMetadata,fCallBack)
	{
		if (this.chunkQueue.length() < this.fable.settings.ChunkQueueSize)
		{
			return this.pushChunk(pChunk, pChunkMetadata, fCallBack);
		}
		else
		{
			// The queue is flush with records, wait to submit this until it is full.
			if (!this.chunkQueue.paused)
				this.chunkQueue.pause();

			
		}
	}
}

module.exports = ChunkQueue;