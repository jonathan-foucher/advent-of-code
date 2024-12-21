import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const registers = []
let program = []

const xor = (n2, n1) => {
  const shift = 2 ** 31
  const n1h = Math.trunc(n1 / shift)
  const n2h = Math.trunc(n2 / shift)
  const n1l = n1 % shift
  const n2l = n2 % shift
  return shift * new Number(n1h ^ n2h) + new Number(n1l ^ n2l)
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (line.includes('Register')) {
    registers.push(parseInt(line.split(': ')[1]))
  }
  if (line.includes('Program')) {
    program = line.split(': ')[1].split(',').map(number => parseInt(number))
  }
}

let result = []
let pointer = 0
while (pointer >= 0 && pointer < program.length) {
  const opcode = program[pointer]
  const operand = program[pointer + 1]
  let comboOperand = operand

  switch (operand) {
    case 4:
      comboOperand = registers[0]
      break;
    case 5:
      comboOperand = registers[1]
      break;
    case 6:
      comboOperand = registers[2]
      break;
  }

  switch (opcode) {
    case 0:
      registers[0] = Math.trunc(registers[0] / Math.pow(2, comboOperand))
      break;
    case 1:
      registers[1] = xor(registers[1], operand)
      break;
    case 2:
      registers[1] = comboOperand % 8
      break;
    case 3:
      if (registers[0] !== 0) {
        pointer = operand - 2
      }
      break;
    case 4:
      registers[1] = xor(registers[1], registers[2])
      break;
    case 5:
      result.push(comboOperand % 8)
      break;
    case 6:
      registers[1] = Math.trunc(registers[0] / Math.pow(2, comboOperand))
      break;
    case 7:
      registers[2] = Math.trunc(registers[0] / Math.pow(2, comboOperand))
      break;
  }
  pointer += 2
}

console.log(result.join(','))
