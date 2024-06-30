const core = require('@actions/core')
const github = require('@actions/github')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // TODO: Assert event is workflow_dispatch

    const separator = core.getInput('separator') === "" ? " " : core.getInput('separator')
    core.info(`Using separator "${separator}"`)

    const ignoreList = core.getInput('ignore').split(',')
    const inputs = github.context.payload.inputs
    core.info(`Loaded inputs: ${JSON.stringify(inputs, null, 2)}`)
    core.info(`Ignoring inputs: ${ignoreList}`)

    let output = ''

    for (const key in inputs) {
      if (ignoreList.includes(key)) continue

      const value = inputs[key]
      if (value === 'true') {
        output += key
        output += separator
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
