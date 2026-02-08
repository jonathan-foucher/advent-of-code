import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)
let stateId = /^Begin in state (?<stateId>[A-Z]).$/.exec(lines[0]).groups['stateId']
const steps = parseInt(/^Perform a diagnostic checksum after (?<steps>\d+) steps.$/.exec(lines[1]).groups['steps'])

const states = new Map()
let y = 3
while (lines[y] !== undefined) {
  const id = /^In state (?<stateId>[A-Z]):$/.exec(lines[y]).groups['stateId']
  y++

  const rules = []
  for (let _ = 0; _ < 2; _++) {
    y++
    const value = parseInt(/Write the value (?<value>0|1).$/.exec(lines[y]).groups['value'])
    y++

    const offset =
      /Move one slot to the (?<direction>(right|left)).$/.exec(lines[y]).groups['direction'] === 'right' ? 1 : -1
    y++

    const stateId = /Continue with state (?<stateId>[A-Z]).$/.exec(lines[y]).groups['stateId']
    y++

    rules.push({ value, offset, stateId })
  }

  states.set(id, rules)
  y++
}

let cursor = 0
const tape = {}
for (let _ = 0; _ < steps; _++) {
  const value = tape[cursor] ?? 0
  const rule = states.get(stateId)[value]

  tape[cursor] = rule.value
  cursor += rule.offset
  stateId = rule.stateId
}

const result = Object.values(tape).filter((value) => value === 1).length
console.log(result)
