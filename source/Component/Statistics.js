/**
* @license MIT
* @author <steven@velozo.com>
*/
var libQuantifier = require('quantifier');

/**
* Sucker Statistics Module
*/
class Statistics
{
	constructor(pSucker)
	{
		this.fable = pSucker.Fable;
		//this.webserver = pWebServer;

		this.sets = {};
		this.setNames = [];

		this.log = [];
	}

	registerSet(pSet)
	{
		if (this.sets.hasOwnProperty(pSet))
			return false;

		this.sets[pSet] = libQuantifier();
		this.setNames.push(pSet);
		return true;
	}

	getQuantizedBucket()
	{
		// Use a library?
		return 1;
	}

	incrementSet(pSet, pAmount)
	{
		// Increment a value to this set.
		this.sets[pSet].addValue((typeof(pAmount)=='undefined') ? 1 : pAmount);
	}

	writeLog(pText)
	{
		// We can graph the time on a line
		this.log.push({Time:'SomeTime', Message:pText});
	}
}

module.exports = Statistics;