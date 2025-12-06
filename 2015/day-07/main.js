import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const wires = new Map()

const gates = readFile(FILE_NAME).map((gate) => {
  const inputWires = gate
    .split('-> ')[0]
    .split(' ')
    .filter((value) => value !== value.toUpperCase() || !isNaN(parseInt(value)))
    .map((value) => (!isNaN(parseInt(value)) ? parseInt(value) : value))

  const operation = gate
    .split('-> ')[0]
    .split(' ')
    .find((value) => value === value.toUpperCase() && isNaN(parseInt(value)))

  return {
    inputWires,
    operation,
    wire: gate.split('-> ')[1],
  }
})

while (gates.some((gate) => gate.result === undefined)) {
  const gatesToProcess = gates.filter((gate) => gate.result === undefined)
  for (let i = 0; i < gatesToProcess.length; i++) {
    const gate = gatesToProcess[i]

    if (
      gate.result === undefined
      && gate.inputWires.every((inputWire) => !isNaN(inputWire) || wires.get(inputWire) !== undefined)
    ) {
      const inputA = isNaN(gate.inputWires[0]) ? wires.get(gate.inputWires[0]) : gate.inputWires[0]
      const inputB = isNaN(gate.inputWires[1]) ? wires.get(gate.inputWires[1]) : gate.inputWires[1]

      switch (gate.operation) {
        case 'AND':
          gate.result = inputA & inputB
          break
        case 'OR':
          gate.result = inputA | inputB
          break
        case 'LSHIFT':
          gate.result = inputA << inputB
          break
        case 'RSHIFT':
          gate.result = inputA >>> inputB
          break
        case 'NOT':
          gate.result = ~inputA
          break
        default:
          gate.result = inputA
      }
      wires.set(gate.wire, gate.result)
    }
  }
}

console.log(wires.get('a'))
