import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)
const Z_REGEX = /^z\d\d$/

const wires = new Map()
const gates = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (line.includes(':')) {
    wires.set(line.split(': ')[0], parseInt(line.split(': ')[1]))
    continue
  }

  if (line.includes('->')) {
    gates.push({
      input1: line.split(' -> ')[0].split(' ')[0],
      input2: line.split(' -> ')[0].split(' ')[2],
      output: line.split(' -> ')[1],
      operation: line.split(' -> ')[0].split(' ')[1],
      result: null,
    })
  }
}

while (gates.some((gate) => gate.result === null)) {
  const gatesToCalculate = gates.filter((gate) => gate.result === null)

  for (let i = 0; i < gatesToCalculate.length; i++) {
    const gate = gatesToCalculate[i]
    const value1 = wires.get(gate.input1)
    const value2 = wires.get(gate.input2)

    if (Number.isInteger(value1) && Number.isInteger(value2)) {
      let result

      switch (gate.operation) {
        case 'AND':
          result = value1 & value2
          break
        case 'OR':
          result = value1 | value2
          break
        case 'XOR':
          result = value1 ^ value2
          break
      }

      gate.result = result
      wires.set(gate.output, result)
    }
  }
}

const result = parseInt(
  Array.from(wires.entries())
    .filter((wire) => Z_REGEX.test(wire[0]))
    .sort((a, b) => {
      const aValue = parseInt(a[0].split('z')[1])
      const bValue = parseInt(b[0].split('z')[1])
      if (aValue > bValue) {
        return -1
      } else {
        return 1
      }
    })
    .map((wire) => wire[1])
    .join(''),
  2
)

console.log(result)
