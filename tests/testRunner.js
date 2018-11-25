// Source of tests
const lib = require('./../app/lib')

// Color definitions to make output more user friendly
const CYAN = '\x1b[36m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'

/**
 * General test runner
 * Takes all founded tests, runs them, collect results and 
 * display the most importatn informations along with
 * encountered errors
 * @param {*} tests Object, key: string, value: function (test) with assert statements 
 */
const testRunner = (tests) => {
  console.log(CYAN, '------ TEST RUNNER ------')
  // check wheter or not we found any tests
  if (!tests || !Object.keys(tests).length) {
    console.log('Tests not found!')
    return
  }

  const numberOfTests = Object.keys(tests).length
  console.log(`Found ${numberOfTests} tests`)
  const results = runTests(tests)
  // we don't care about tests that passed, we only need
  // ones that failed
  const failedTests = results.filter(res => !!res)

  // Prints stats
  console.log(CYAN, 'Stats:')
  console.log(GREEN, `  Ok: ${numberOfTests - failedTests.length}`)
  console.log(RED, `  Failed: ${failedTests.length}`)

  // no errors? just exit
  if (!failedTests.length) { return }

  printErrors(failedTests)

}

// Function that run tests, collects results and return them
// in nice, contained array
const runTests = (tests) => Object.entries(tests).map(([key, func]) => {
  console.log(CYAN, `${key}`)
  let result = null
  try {
    func()
    console.log(GREEN, 'Ok')
  } catch (error) {
    console.log(RED, 'Fail!')
    result = { key, error }
  }
  return result
})

// Prints in nice, readable way encountered errors
const printErrors = failedTests => {
  console.log(CYAN, 'Errors: ')
  failedTests.forEach(({ key, error }) => {
    console.log(CYAN, `------ ${key} ------`)
    console.error(RED, error)
    console.log(CYAN, '--------------------')
  })
}

testRunner(lib.tests)