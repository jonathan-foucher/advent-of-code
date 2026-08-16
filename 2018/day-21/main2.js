import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/modified-input-2.txt'

const lines = readFile(FILE_NAME)
const IP = lines[0].split(' ')[1]

const operations = [
  {
    operation: 'addr',
    exec: (registers, inputA, inputB) => registers[inputA] + registers[inputB],
  },
  {
    operation: 'addi',
    exec: (registers, inputA, inputB) => registers[inputA] + inputB,
  },
  {
    operation: 'mulr',
    exec: (registers, inputA, inputB) => registers[inputA] * registers[inputB],
  },
  {
    operation: 'muli',
    exec: (registers, inputA, inputB) => registers[inputA] * inputB,
  },
  {
    operation: 'banr',
    exec: (registers, inputA, inputB) => registers[inputA] & registers[inputB],
  },
  {
    operation: 'bani',
    exec: (registers, inputA, inputB) => registers[inputA] & inputB,
  },
  {
    operation: 'borr',
    exec: (registers, inputA, inputB) => registers[inputA] | registers[inputB],
  },
  {
    operation: 'bori',
    exec: (registers, inputA, inputB) => registers[inputA] | inputB,
  },
  {
    operation: 'setr',
    exec: (registers, inputA) => registers[inputA],
  },
  {
    operation: 'seti',
    exec: (_, inputA) => inputA,
  },
  {
    operation: 'gtir',
    exec: (registers, inputA, inputB) => (inputA > registers[inputB] ? 1 : 0),
  },
  {
    operation: 'gtri',
    exec: (registers, inputA, inputB) => (registers[inputA] > inputB ? 1 : 0),
  },
  {
    operation: 'gtrr',
    exec: (registers, inputA, inputB) => (registers[inputA] > registers[inputB] ? 1 : 0),
  },
  {
    operation: 'eqir',
    exec: (registers, inputA, inputB) => (inputA === registers[inputB] ? 1 : 0),
  },
  {
    operation: 'eqri',
    exec: (registers, inputA, inputB) => (registers[inputA] === inputB ? 1 : 0),
  },
  {
    operation: 'eqrr',
    exec: (registers, inputA, inputB) => (registers[inputA] === registers[inputB] ? 1 : 0),
  },
]

const instructions = []
for (let i = 1; i < lines.length; i++) {
  const instruction = lines[i].split(' ')

  instructions.push({
    operation: operations.find((op) => op.operation === instruction[0]),
    inputA: parseInt(instruction[1]),
    inputB: parseInt(instruction[2]),
    output: parseInt(instruction[3]),
  })
}

const registers = [0, 0, 0, 0, 0, 0]
const r5Values = []
mainloop: while (true) {
  const cursor = registers[IP]
  if (cursor === 28) {
    if (!r5Values.includes(registers[5])) {
      r5Values.push(registers[5])
    } else {
      break mainloop
    }
  }

  const instruction = instructions[cursor]
  registers[instruction.output] = instruction.operation.exec(registers, instruction.inputA, instruction.inputB)
  registers[IP]++
}

const result = r5Values[r5Values.length - 1]
console.log(result)
