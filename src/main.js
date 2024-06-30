const core = require('@actions/core')
const github = require('@actions/github')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // TODO: Assert event is workflow_dispatch

    var separator = core.getInput('separator')
    if (separator == '') {
      separator = ' '
    }
    core.info(`Using separator "${separator}"`)

    const ignoreList = core.getInput('ignore').split(',')
    const inputs = github.context.payload.inputs
    core.info(`Loaded inputs: ${JSON.stringify(inputs, null, 2)}`)
    core.info(`[NOT IMPLEMENTED] Ignoring inputs: ${ignoreList}`)

    var output = ''

    for (let key in inputs) {
      if (ignoreList.includes(key)) continue
      if (inputs.hasOwnProperty(key)) {
        value = inputs[key]
        if (value == 'true') {
          output += key
          output += separator
        }
      }
    }
    core.setOutput('selected', output)
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
