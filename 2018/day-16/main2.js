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
      inputA: instruction[1],
      inputB: instruction[2],
      output: instruction[3],
    },
  })
  i += 4
}

const program = []
for (let j = i + 2; j < lines.length; j++) {
  const instruction = lines[j].split(' ').map((char) => parseInt(char))
  program.push({
    opcode: instruction[0],
    inputA: instruction[1],
    inputB: instruction[2],
    output: instruction[3],
  })
}

const instructions = [
  {
    name: 'addr',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => registers[inputA] + registers[inputB],
  },
  {
    name: 'addi',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => registers[inputA] + inputB,
  },
  {
    name: 'mulr',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => registers[inputA] * registers[inputB],
  },
  {
    name: 'muli',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => registers[inputA] * inputB,
  },
  {
    name: 'banr',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => registers[inputA] & registers[inputB],
  },
  {
    name: 'bani',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => registers[inputA] & inputB,
  },
  {
    name: 'borr',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => registers[inputA] | registers[inputB],
  },
  {
    name: 'bori',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => registers[inputA] | inputB,
  },
  {
    name: 'setr',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA) => registers[inputA],
  },
  {
    name: 'seti',
    opcode: null,
    workingOpcodes: [],
    exec: (_, inputA) => inputA,
  },
  {
    name: 'gtir',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => (inputA > registers[inputB] ? 1 : 0),
  },
  {
    name: 'gtri',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => (registers[inputA] > inputB ? 1 : 0),
  },
  {
    name: 'gtrr',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => (registers[inputA] > registers[inputB] ? 1 : 0),
  },
  {
    name: 'eqir',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => (inputA === registers[inputB] ? 1 : 0),
  },
  {
    name: 'eqri',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => (registers[inputA] === inputB ? 1 : 0),
  },
  {
    name: 'eqrr',
    opcode: null,
    workingOpcodes: [],
    exec: (registers, inputA, inputB) => (registers[inputA] === registers[inputB] ? 1 : 0),
  },
]

for (const capture of captures) {
  instructionsloop: for (const instruction of instructions) {
    const registers = [...capture.before]
    registers[capture.instruction.output] = instruction.exec(
      registers,
      capture.instruction.inputA,
      capture.instruction.inputB
    )

    for (let i = 0; i < 4; i++) {
      if (registers[i] !== capture.after[i]) {
        continue instructionsloop
      }
    }
    if (!instruction.workingOpcodes.includes(capture.instruction.opcode)) {
      instruction.workingOpcodes.push(capture.instruction.opcode)
    }
  }
}

while (instructions.some((instruction) => instruction.opcode === null)) {
  for (const instruction of instructions) {
    if (instruction.opcode !== null) {
      continue
    }

    const attributedOpcodes = instructions.map((instruction) => instruction.opcode).filter((opcode) => opcode !== null)
    const workingOpcodes = instruction.workingOpcodes.filter((opcode) => !attributedOpcodes.includes(opcode))

    if (workingOpcodes.length === 1) {
      instruction.opcode = workingOpcodes[0]
    }
  }
}

const registers = [0, 0, 0, 0]
for (const line of program) {
  const instruction = instructions.find((instruction) => instruction.opcode === line.opcode)
  registers[line.output] = instruction.exec(registers, line.inputA, line.inputB)
}

const result = registers[0]
console.log(result)
