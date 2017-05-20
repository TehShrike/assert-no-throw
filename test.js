const test = require('tape')
const noThrow = require('./')
const rawAssert = require('power-assert')


test('readme basic case', t => {
	const assertWrapper = noThrow(rawAssert)

	assertWrapper.assert.deepEqual({ thing: 'thingy' }, { thing: 'thingy' })
	assertWrapper.assert.deepEqual({ thing: 'thingy' }, { thing: 'WAT' })

	t.equal(assertWrapper.results.length, 2)
	t.equal(assertWrapper.results[0].pass, true)
	t.equal(assertWrapper.results[0].error, undefined)

	t.equal(assertWrapper.results[1].pass, false)
	t.equal(typeof assertWrapper.results[1].error.message, 'string')

	t.end()
})

test('events', t => {
	const assertWrapper = noThrow(rawAssert)

	let emitted = 0
	assertWrapper.on('assert', result => {
		t.equal(typeof result.pass, 'boolean')
		emitted++
	})

	assertWrapper.assert.equal(1, 1)
	assertWrapper.assert.equal(1, 2)
	assertWrapper.assert.equal(2, 2)

	t.equal(emitted, 3)

	t.end()
})
