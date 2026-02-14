import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

let i = 0
const captures = []
while (true) {
  const before = /Before:\s+\[(?<registers>(.*))\]/
    .exec(lines[i])
    ?.groups['registers']?.split(', ')
    ?.map((char) => parseInt(char))

  if (before === undefined) {
    break
  }

  const instruction = lines[i + 1].split(' ').map((char) => parseInt(char))

  const after = /After:\s+\[(?<registers>(.*))\]/
    .exec(lines[i + 2])
    .groups['registers'].split(', ')
    .map((char) => parseInt(char))

  captures.push({
    before,
    after,
    instruction: {
      opcode: instruction[0],
      intputA: instruction[1],
      intputB: instruction[2],
      output: instruction[3],
    },
  })
  i += 4
}

const instructions = [
  {
    name: 'addr',
    exec: (registers, inputA, inputB) => registers[inputA] + registers[inputB],
  },
  {
    name: 'addi',
    exec: (registers, inputA, inputB) => registers[inputA] + inputB,
  },
  {
    name: 'mulr',
    exec: (registers, inputA, inputB) => registers[inputA] * registers[inputB],
  },
  {
    name: 'muli',
    exec: (registers, inputA, inputB) => registers[inputA] * inputB,
  },
  {
    name: 'banr',
    exec: (registers, inputA, inputB) => registers[inputA] & registers[inputB],
  },
  {
    name: 'bani',
    exec: (registers, inputA, inputB) => registers[inputA] & inputB,
  },
  {
    name: 'borr',
    exec: (registers, inputA, inputB) => registers[inputA] | registers[inputB],
  },
  {
    name: 'bori',
    exec: (registers, inputA, inputB) => registers[inputA] | inputB,
  },
  {
    name: 'setr',
    exec: (registers, inputA) => registers[inputA],
  },
  {
    name: 'seti',
    exec: (_, inputA) => inputA,
  },
  {
    name: 'gtir',
    exec: (registers, inputA, inputB) => (inputA > registers[inputB] ? 1 : 0),
  },
  {
    name: 'gtri',
    exec: (registers, inputA, inputB) => (registers[inputA] > inputB ? 1 : 0),
  },
  {
    name: 'gtrr',
    exec: (registers, inputA, inputB) => (registers[inputA] > registers[inputB] ? 1 : 0),
  },
  {
    name: 'eqir',
    exec: (registers, inputA, inputB) => (inputA === registers[inputB] ? 1 : 0),
  },
  {
    name: 'eqri',
    exec: (registers, inputA, inputB) => (registers[inputA] === inputB ? 1 : 0),
  },
  {
    name: 'eqrr',
    exec: (registers, inputA, inputB) => (registers[inputA] === registers[inputB] ? 1 : 0),
  },
]

let result = 0
capturesloop: for (const capture of captures) {
  let count = 0
  instructionsloop: for (const instruction of instructions) {
    const registers = [...capture.before]
    registers[capture.instruction.output] = instruction.exec(
      registers,
      capture.instruction.intputA,
      capture.instruction.intputB
    )

    for (let i = 0; i < 4; i++) {
      if (registers[i] !== capture.after[i]) {
        continue instructionsloop
      }
    }
    count++

    if (count >= 3) {
      result++
      continue capturesloop
    }
  }
}

console.log(result)
