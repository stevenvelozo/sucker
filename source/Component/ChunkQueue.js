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

		this.queueGUID = this.fable.getUUID();
		this.currentQueueIndex = 0;

		// Each Source can add functions to the queue empty event
		this.emptyListeners = {};

		this.initializeQueue();
	}

	initializeQueue()
	{
		this.queue = libAsync.queue(
			(pTaskData, fCallBack)=>
			{
				this.fable.sucker.Marshaller.marshal(pTaskData.Chunk,pTaskData.Metadata);
				fCallBack();
			}
		);

		this.queue.concurrency = this.fable.settings.queueParallel;
	}

	pushChunk(pChunk, pChunkMetadata, fCallBack)
	{
		return this.queue.push({Chunk:pChunk, Metadata:libUnderscore.extend({ChunkQueueIndex:++this.currentQueueIndex,ChunkQueueGUID:this.queueGUID}, pChunkMetadata)}, fCallBack);
	}

	emptyEvent()
	{

	}
}

module.exports = ChunkQueue;