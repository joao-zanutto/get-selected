# Get Selected

[![GitHub Super-Linter](https://github.com/actions/hello-world-javascript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/hello-world-javascript-action/actions/workflows/ci.yml/badge.svg)

This action returns a list with the names of selected checkboxes from the input
of a `workflow_dispatch` event. It supports the use of custom separator strings
and an ignore list, which will be ignored from the output.

## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: Example Workflow

on:
  workflow_dispatch:
    inputs:
      api:
        type: boolean
        default: false
      worker:
        type: boolean
        default: true

jobs:
  get-selected:
    name: GitHub Actions Test
    runs-on: ubuntu-latest
    outputs: # This needs to be set if you want to consume the output on another job
      selected: ${{ steps.get-selected-step.outputs.selected}}
    steps:
      - name: Checkout
        id: checkout
        uses: actions/checkout@v4

      - name: Test Local Action
        id: get-selected-step
        uses: joao-zanutto/get-selected@v1

      - name: Consume on the same job
        run: echo ${{ steps.get-selected-step.outputs.selected }}

  consume-on-another-job:
    runs-on: ubuntu-latest
    name: Consume Output
    needs: get-selected
    steps:
      - name: Print
        run: echo ${{ needs.get-selected.outputs.selected }}
```

## Inputs

| Input       | Required | Default | Description                                                          |
| ----------- | -------- | ------- | -------------------------------------------------------------------- |
| `ignore`    | `false`  | ` `     | Comma-separated list of checkboxes to ommit from the output          |
| `separator` | `false`  | `' '`   | Separator to append between each of the options in the output string |

## Outputs

| Output     | Description                      |
| ---------- | -------------------------------- |
| `selected` | Names of the selected checkboxes |
