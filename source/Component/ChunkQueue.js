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
	constructor(pSucker)
	{
		this.fable = pSucker.fable;
		//this.webserver = pWebServer;

		// Each Source can add functions to the queue empty event
		this.emptyListeners = {};

		this.initializeQueue();
	}

	initializeQueue()
	{
		this.queue = libAsync.queue(
			(pTaskData, fCallBack)=>
			{
				// Each source can marshal on one of three things.
				// By default it marshals to itself.
				// It can also go through mapped by the GUID, Type or Hash of another Source
				this.fable.sucker.Marshaller.marshal(pTaskData.Chunk,pTaskData.Metadata);
				fCallBack();
			}
		);

		this.queue.empty = ()=>
		{
			this.processEmptyEvents();
		};

		this.queue.concurrency = this.fable.settings.queueParallel;
	}

	pushChunk(pChunk, pChunkMetadata, fCallBack)
	{
		return this.queue.push(
			{
				Chunk:pChunk, 
				Metadata:libUnderscore.extend(
					{
						ChunkQueueIndex:++this.currentQueueIndex,
						ChunkQueueGUID:this.queueGUID
					}, pChunkMetadata)
			}, fCallBack);
	}

	processEmptyEvents()
	{
		var tmpListeners = Object.keys(this.emptyListeners);

		// This should be asynchronous
		for (let i = 0; i < tmpListeners.length; i++)
		{
			this.fable.log.trace(`Calling empty listener ${i}`);
			this.emptyListeners[tmpListeners[i]](
				()=>
				{ 
					delete this.emptyListeners[tmpListeners[i]];
				});
			// Now delete the listener.
			// TODO: Research what happens if the function property is deleted while the task is still running.
			
		}

		return true;
	}
}

module.exports = ChunkQueue;