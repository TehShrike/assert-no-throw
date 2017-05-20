const EventEmitter = require('eventemitter3')

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
			try {
				rawAssert[method](...args)
			} catch (err) {
				report(makeErrorObject(method, err))
				return
			}
			report(makeSuccessObject(method))
		}
	})

	return coolAssert
}

function makeErrorObject(method, error) {
	return { method, pass: false, error }
}

function makeSuccessObject(method) {
	return { method, pass: true }
}
