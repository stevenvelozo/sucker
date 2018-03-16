/**
* @license MIT
* @author <steven@velozo.com>
*/
var ChunkSourceBase = require(`${__dirname}/../ChunkSource.js`);

var libChance = require('chance');

/**
* Sucker Chunk Source: Default Source (no operation)
*/
class ChunkSource extends ChunkSourceBase { }


module.exports = ChunkSource;