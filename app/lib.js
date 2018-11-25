const assert = require('assert')

const functions = {
  // Generates random nubmer between <min> and <max>, returns number
  randomNumberGenerator: (min, max) => {
    if (typeof min !== 'number' || typeof max !== 'number') {
      throw 'Arguments needs to be type of number'
    }
    return Math.random() * (max - min) + min
  },
  // Checks wheter or not passed argument is an Array, returns boolean
  isArray: (arg) => {
    if (!arg) { throw 'Argument is not provided' }
    return Object.prototype.toString.call(arg) === '[object Array]';
  },
  // Creates queryString from passed object, returns string
  buildQueryString: (params) => {
    return params && Object.keys(params).length
      ? `?${Object.keys(params)
        .map((key) => {
          const value = params[key]
          return value && `${key}=${value}`
        })
        .filter(item => !!item)
        .join('&')}`
      : ''
  }
}

const tests = {
  'Check randomNumberGenerator for valid input': () => {
    const min = 0
    const max = 10
    const randomNumber = functions.randomNumberGenerator(min, max)
    assert.ok(randomNumber < max)
    assert.ok(randomNumber > min)
  },
  'Check randomNumberGenerator for invalid input': () => {
    const min = 'string'
    const max = []
    try { functions.randomNumberGenerator(min, max) }
    catch (error) {
      assert.equal(error, 'Arguments needs to be type of number')
    }
  },
  'Check randomNumberGenerator for no input': () => {
    try { functions.randomNumberGenerator() }
    catch (error) {
      assert.equal(error, 'Arguments needs to be type of number')
    }
  },
  'Check isArray for array with elements': () => {
    assert.ok(functions.isArray([1, 2, 3, 4]))
    assert.ok(functions.isArray([{}, 1, false]))
    assert.ok(functions.isArray([]))
  },
  'Check isArray for empty input': () => {
    try { functions.isArray([1, 2, 3, 4]) }
    catch (error) {
      assert.equal(error, 'Argument is not provided')
    }
  },
  'Check buildQueryString for valid input': () => {
    const { buildQueryString } = functions
    const input = { a: 'one', b: 2, c: 3 }
    const expectedOutput = '?a=one&b=2&c=3'
    assert.equal(buildQueryString(input), expectedOutput)
  },
  'Check buildQueryString for input with mixed false values': () => {
    const { buildQueryString } = functions
    const input = { a: 'one', b: false, c: false }
    const expectedOutput = '?a=one'
    assert.equal(buildQueryString(input), expectedOutput)
  },
  'Check buildQueryString for input with only false values': () => {
    const { buildQueryString } = functions
    const input = { a: false, b: false, c: false }
    const expectedOutput = '?'
    assert.equal(buildQueryString(input), expectedOutput)
  },
  'Check buildQueryString for input with no values': () => {
    const { buildQueryString } = functions
    const expectedOutput = ''
    assert.equal(buildQueryString({}), expectedOutput)
    assert.equal(buildQueryString(), expectedOutput)
  },
}

module.exports = { functions, tests }