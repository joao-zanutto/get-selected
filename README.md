# Get Selected

[![GitHub Super-Linter](https://github.com/joao-zanutto/get-selected/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/joao-zanutto/get-selected/actions/workflows/ci.yml/badge.svg)

This action returns a list with the names of selected checkboxes from the input
of a `workflow_dispatch` event. It supports the use of custom separator strings
and an ignore list, which will be ignored from the output.

## Usage

Here's an example of how to use this action in a workflow file:

```yml
on:
  workflow_dispatch:
    inputs: # Example inputs
      api:
        type: boolean
      worker1:
        type: boolean
      worker2:
        type: boolean

jobs:
  get-selected:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - id: get-selected-step
        uses: joao-zanutto/get-selected@v1

      - run: echo ${{ steps.get-selected-step.outputs.selected }}
```

### Working example

Running the workflow:

![image](https://github.com/joao-zanutto/get-selected/assets/11475695/fd4382c4-6733-45ca-b40a-f43df5f090ca)

Will generate the following output:

![image](https://github.com/joao-zanutto/get-selected/assets/11475695/f0d4a4c8-9523-477e-87ec-b7110b5c0816)

## Referencing the output on a different job

```yaml
jobs:
  get-selected:
    runs-on: ubuntu-latest
    outputs: # Set this to consume the output on other job
      selected: ${{ steps.get-selected-step.outputs.selected}}
    steps:
      - uses: actions/checkout@v4

      - id: get-selected-step
        uses: joao-zanutto/get-selected@v1

  consume-on-another-job:
    runs-on: ubuntu-latest
    needs: get-selected
    steps:
      - run: echo ${{ needs.get-selected.outputs.selected }}
```

## Inputs

| Input       | Required | Default  | Description                             |
| ----------- | -------- | -------- | --------------------------------------- |
| `ignore`    | `false`  | `null`   | Comma-separated options to ignore       |
| `format`    | `false`  | `'list'` | Output format. `list` or `json`         |
| `separator` | `false`  | `' '`    | Separator; only vaid for `format: list` |

## Outputs

| Output     | Description                      |
| ---------- | -------------------------------- |
| `selected` | Names of the selected checkboxes |
