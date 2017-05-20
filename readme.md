For testing libraries that want to use an existing assertion library like the awesome [`power-assert`](https://github.com/power-assert-js/power-assert), but collect all the results up without letting failed tests throw errors.

# Usage

```js
const noThrow = require('assert-no-throw')
const rawAssert = require('power-assert')

const assertWrapper = noThrow(rawAssert)

assertWrapper.assert.deepEqual({ thing: 'thingy' }, { thing: 'thingy' })
assertWrapper.assert.deepEqual({ thing: 'thingy' }, { thing: 'WAT' })

assertWrapper.results /* => [ 
	{ 
		method: 'deepEqual', 
		pass: true 
	}, { 
		method: 'deepEqual',
		pass: false,
		error: 
		{ 
			name: 'AssertionError',
			actual: [Object],
			expected: [Object],
			operator: 'deepEqual',
			message: '{ thing: \'thingy\' } deepEqual { thing: \'WAT\' }',
			generatedMessage: true 
		} 
	} 
]
*/
```

## Result objects

Have these properties:

- `method`: string, the name of the assertion method
- `pass`: boolean, whether the assertion method threw an error or not
- `error`: if `pass` is false, this should be an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) instance

# Events

The assert wrapper object is an event emitter - it emits just one event, `assert`, whenever a method is called.	The event contains an object matching the result object above.

# License

[WTFPL](http://wtfpl2.com)
