/**
* @license MIT
* @author <steven@velozo.com>
*/
var ChunkSourceBase = require(`${__dirname}/../ChunkSource.js`);

var libChance = require('chance');

/**
* Sucker Chunk Source: Random Noise Generator
*
* A minimal random noise chunk source.
*/
class ChunkSource extends ChunkSourceBase
{
	constructor(pFable, pWebServer)
	{
		super(pFable, pWebServer);

		this.sourceType = 'RandomNoise';

		// The random interval span that will happen between generation of chunks
		this.randomIntervalMinimum = 5;
		this.randomIntervalMaximum = 100;

		// The maximum number of chunks that this source will create.
		this.maxChunks = 5000;

		this.chunkGenerator = false;
	}

	getChunkInterval()
	{
		// Return a random integer between Minimum and Maximum interval length
		return Math.floor(Math.random() * (this.randomIntervalMaximum - this.randomIntervalMinimum + 1)) + this.randomIntervalMinimum;
	}

	generateChunk()
	{
		// Create a random chunk
		this.pushChunk(libChance.paragraph(), {},
			()=>
			{
				// If the source is still running, and we haven't created max chunks, create another in a random amount of time.
				if (this.running && this.currentSourceIndex < this.maxChunks)
					this.chunkGenerator = setTimeout(
						()=>
						{
							this.generateChunk();
						}, this.getChunkInterval());
			});
	}

	start()
	{
		if (!super.start())
			return false;

		// Now start a random data generator

		return true;
	}

	continue()
	{
		if (!super.continue())
			return false;

		return true;
	}

	pause()
	{
		if (!super.pause())
			return false;

		return true;
	}
}


module.exports = ChunkSource;