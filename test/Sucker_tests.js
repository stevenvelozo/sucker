/**
* Unit tests for Suckering
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*/

var Chai = require('chai');
var Expect = Chai.expect;
var Assert = Chai.assert;

var libSucker = require(`${__dirname}/../source/Sucker.js`);

suite
(
	'Sucker',
	function()
	{
		setup
		(
			function()
			{
			}
		);

		suite
		(
			'Object Sanity',
			function()
			{
				test
				(
					'initialize should build a happy little object',
					function()
					{
						var testSucker = new libSucker();
						Expect(testSucker)
							.to.be.an('object', 'Sucker should initialize as an object directly from the require statement.');
					}
				);
				test
				(
					'basic class parameters',
					function()
					{
						var testSucker = new libSucker();

						Expect(testSucker).to.have.a.property('settings')
							.that.is.a('object');
						/*
						Expect(testSucker.settings).to.have.a.property('Title')
							.that.is.a('string'); 
						Expect(testSucker.statistics).to.have.a.property('Entries')
							.that.is.a('boolean'); 
						Expect(testSucker.statistics).to.have.a.property('PushOperations')
							.that.is.a('number'); 
						*/
					}
				);
			}
		);
	}
);