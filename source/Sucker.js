/**
* @license MIT
* @author <steven@velozo.com>
*/
var libUnderscore = require('underscore');
var libOrator = require('orator');

/**
* Sucker data import from streams to Meadow entities
*
* [Stream] -> [Splitter] -> [Chunk Queue] -> [Marshaller] -> [Record Queue] -> [Record Importer]
*
* Stream:          a stock node input stream for things like a file read
*
* Chunk Splitter:  breaks the Stream into Chunks
* Chunk Queue:     a Queue of Chunks split from a stream (might be fifo or parallel)
* Marshaller:      a method or set of methods for generating records based on State and a current Chunk
*                  (the Marshaller manages internal state -- by default this is a simple decision tree)
* Record Buffer:   a Buffer (Queue) of Records ready to be written out
* Record Importer: a set of methods for writing records out (defaults to Meadow Endpoints)
*
* Entity Cache:    a cache of GUID / ID / Entity / UpdateDates for a set of records
*/
class Sucker
{
	constructor(pSettings)
	{
		// The settings object.
		this.settings = libUnderscore.extend(require(`${__dirname}/Sucker-DefaultSettings.js`), pSettings);

		this.webserver = libOrator.new(this.settings);
		this.fable = this.webserver.fable;

		this.fable.sucker = {};

		this.fable.sucker.ChunkSplitter = new (require(`${__dirname}/Components/ChunkSplitter.js`))(this.fable, this.webserver);
		this.fable.sucker.ChunkQueue = new (require(`${__dirname}/Components/ChunkQueue.js`))(this.fable, this.webserver);
		this.fable.sucker.Marshaller = new (require(`${__dirname}/Components/Marshaller.js`))(this.fable, this.webserver);
		this.fable.sucker.RecordBuffer = new (require(`${__dirname}/Components/RecordBuffer.js`))(this.fable, this.webserver);
		this.fable.sucker.RecordImporter = new (require(`${__dirname}/Components/RecordImporter.js`))(this.fable, this.webserver);
		this.fable.sucker.EntityCache = new (require(`${__dirname}/Components/EntityCache.js`))(this.fable, this.webserver);

		this.fable.log.trace('Sucker initialized.');
	}
}

module.exports = Sucker;