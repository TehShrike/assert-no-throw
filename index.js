const EventEmitter = require('eventemitter3')

const messageIndex = {
	ok: 1,
	equal: 2,
	notEqual: 2,
	strictEqual: 2,
	notStrictEqual: 2,
	deepEqual: 2,
	notDeepEqual: 2,
	deepStrictEqual: 2,
	notDeepStrictEqual: 2,
	fail: 2,
	throws: 2,
	doesNotThrow: 1,
}

module.exports = function wrapAssertionLibrary(rawAssert) {
	const coolAssert = new EventEmitter()
	coolAssert.results = []
	coolAssert.assert = {}

	function report(result) {
		coolAssert.emit('assert', result)
		coolAssert.results.push(result)
	}

	Object.keys(rawAssert).forEach(method => {
		coolAssert.assert[method] = function(...args) {
			const message = args[messageIndex[method]]
			try {
				rawAssert[method](...args)
			} catch (err) {
				report(makeErrorObject(method, err, message))
				return
			}
			report(makeSuccessObject(method, message))
		}
	})

	return coolAssert
}

function makeErrorObject(method, error, message) {
	return { method, pass: false, error, message }
}

function makeSuccessObject(method, message) {
	return { method, pass: true, message }
}
