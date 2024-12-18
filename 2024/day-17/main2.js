import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const registers = []
let program = []

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  if (line.includes('Register')) {
    registers.push(parseInt(line.split(': ')[1]))
  }
  if (line.includes('Program')) {
    program = line.split(': ')[1].split(',').map(number => parseInt(number))
  }
}

let pw = program.length - 1
let aValue = 0
let countArray = []

for (let i = 0; i <= pw; i++) {
  countArray.push(0)
}

while (pw >= 0) {
  let found = false
  while (!found) {
    let a = aValue
    let b
    let c
    let i = 0
    do {
      b = ((a % 8) + 8) % 8
      b = b ^ 5
      c = Math.trunc(a / Math.pow(2, b))
      b = b ^ 6
      a = Math.trunc(a / 8)
      b = b ^ c
      i++
    } while (i <= pw && a !== 0)

    if (i === pw + 1 && (((b % 8) + 8) % 8) === program[pw]) {
      found = true
      pw--
    } else {
      while (countArray[pw] === 7) {
        aValue -= 7 * Math.pow(8, pw)
        countArray[pw] = 0
        pw++
      }
      countArray[pw]++
      aValue += Math.pow(8, pw)
    }
  }
}

registers[0] = aValue
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
      registers[1] = registers[1] ^ operand
      break;
    case 2:
      registers[1] = ((comboOperand % 8) + 8) % 8
      break;
    case 3:
      if (registers[0] !== 0) {
        pointer = operand - 2
      }
      break;
    case 4:
      registers[1] = registers[1] ^ registers[2]
      break;
    case 5:
      result.push(((comboOperand % 8) + 8) % 8)
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

console.log(program.join(','))
console.log(result.join(','))
console.log(result.join(',') === program.join(','))
console.log(aValue)
