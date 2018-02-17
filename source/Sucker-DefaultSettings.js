/**
* @license MIT
* @author <steven@velozo.com>
*/

/**
* Sucker Default Settings Object
*/

module.exports = (
	{
		// Importer Name -- for logging and some reporting features
		Name: 'Default Importer',

		// Whether to provide the web UI
		WebServer: true,
		Product: 'Meadow Sucker',
		ProductVersion: require(`${__dirname}/../package.json`).version,

		"APIServerPort": 8070,

		// Defines what separates "lines" in the line-by-line parsing of the stream.  Defaults to cr/lf || cr || lf
		SplitterChunkSeparator: null,

		// How many records to hold in a queue from the stream
		ChunkQueueSize: 1000,
		// If we should process the Chunk Queue in parallel or not
		ChunkQueueParallel: false,

		// The number of records to queue for the marshaller
		RecordBufferSize: 1000,

		// The number of records to batch write out at a time (should be < queue size)
		RecordImporterWriteChunkSize: 200
	}
);
