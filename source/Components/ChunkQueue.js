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

		this.chunkQueue = libAsync.queue(
			(pTask, fCallBack)=>
			{
				this.fable.sucker.Marshaller.marshal(pTask.Record,)
			}
		);
	}
}

module.exports = ChunkQueue;