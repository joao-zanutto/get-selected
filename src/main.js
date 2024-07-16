const core = require('@actions/core')
const github = require('@actions/github')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    // TODO: Assert event is workflow_dispatch
    const format = core.getInput('format')
    core.info(format)

    const separator =
      core.getInput('separator') === '' ? ' ' : core.getInput('separator')
    core.info(`Using separator "${separator}"`)

    const ignoreList = core.getInput('ignore').split(',')
    const inputList = github.context.payload.inputs
    core.info(`Loaded inputs: ${JSON.stringify(inputList, null, 2)}`)
    core.info(`Ignoring inputs: ${ignoreList}`)

    const selected = []
    for (const key in inputList) {
      if (!ignoreList.includes(key) && inputList[key] === 'true')
        selected.push(key)
    }

    if (format === 'list') core.setOutput('selected', selected.join(separator))
    else if (format === 'json')
      core.setOutput('selected', JSON.stringify(selected, null, 2))
    else core.error('Invalid format. Valid values are: "list" and "json"')
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
