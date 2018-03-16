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
*
* Chunk Source:    consists of a stream and a chunk splitter, to generate chunks
*.                 (Sources have a GUID, a Type and a Hash -- all three are valid reference methods)
*                  (The Hash is defined in the JSON configuration object, or programmatically when a source is added)
* 	Stream:          a stock node input stream for things like a file read
* 	Chunk Splitter:  breaks the Stream into Chunks
*   Marshaller:      a method or set of methods for generating records based on State and a current Chunk
* Chunk Queue:     a Queue of Chunks split from a stream (might be fifo or parallel)
*                  (the Marshaller manages internal state -- by default this is a simple decision tree)
* Record Buffer:   a Buffer (Queue) of Records ready to be written out
* Record Importer: a set of methods for writing records out (defaults to Meadow Endpoints)
*
* Entity Cache:    a cache of GUID / ID / Entity / UpdateDates for a set of records
*/
class Sucker
{
	constructor(pSettings, pOrator)
	{
		// The settings object.
		this.settings = libUnderscore.extend(require(`${__dirname}/Sucker-DefaultSettings.js`), pSettings);

		// Allow the passing in of an orator object?
		this.webserver = (typeof(pOrator) === 'undefined') ? libOrator.new(this.settings) : pOrator;
		this.fable = this.webserver.fable;


		this.defaultChunkSourceConfig = require(`${__dirname}/ChunkSource/ChunkSource-Config-Default.js`);

		// There can be multiple sources for the importer;
		// This allows the marshaller to happen on records once they have been pulled in from chunks at different sources.
		// This also means that the Marshallers will *have* to conform to consisten schema across marshalled records.
//		this.fable.sucker.ChunkSource = new (require(`${__dirname}/Component/ChunkSource.js`))(this.fable, this.webserver);
		this.ChunkSources = {};
		this.ChunkQueue = new (require(`${__dirname}/Component/ChunkQueue.js`))(this.fable, this.webserver);
		this.Marshaller = new (require(`${__dirname}/Component/Marshaller.js`))(this.fable, this.webserver);
		this.RecordBuffer = new (require(`${__dirname}/Component/RecordBuffer.js`))(this.fable, this.webserver);
		this.RecordImporter = new (require(`${__dirname}/Component/RecordImporter.js`))(this.fable, this.webserver);
		this.EntityCache = new (require(`${__dirname}/Component/EntityCache.js`))(this.fable, this.webserver);

		this.Statistics = new (require(`${__dirname}/Component/Statistics.js`))(this.fable, this.webserver);

		this.fable.sucker = this;

		this.fable.log.trace('Sucker initialized.');
	}

	addSource(pSourceHash, pSourceConfig)
	{
		if (typeof(pSourceHash) !== 'string')
		{
			this.fable.log.warn(`Could not initialize chunk source.  Invalid SourceHash type.  Hashes must be a string.`);
			return false;
		}
		if (typeof(pSourceConfig) !== 'object')
		{
			this.fable.log.warn(`Could not initialize chunk source.  Invalid SourceConfig type.  Configs must be an object.`);
			return false;
		}

		let tmpSourceConfig = libUnderscore.extend(this.defaultChunkSourceConfig, pSourceConfig);

		return true;
	}

	// Philosophical question: should you be able to map a source to more than one marshaller?  That might be really cool.
	mapSourceToMarshaller(pSource, pMarshallerAddress, pMarshallerAddressType)
	{
		// By default map to the sources own guid.
		let tmpMarshallerAddress = (typeof(pMarshallerAddress) === 'undefined') ? pSource.sourceGUID : pMarshallerAddress;

		// By default use a GUID Type mapping
		let tmpMarshallerAddressType = (typeof(pMarshallerAddressType) === 'undefined') ? 'GUID' : pMarshallerAddressType;

	}
}

module.exports = Sucker;