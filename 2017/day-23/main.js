import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const registers = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0 }

const instructions = readFile(FILE_NAME).map((line) => {
  const elements = line.split(' ')
  return {
    operation: elements[0],
    param1: isNaN(elements[1]) ? elements[1] : parseInt(elements[1]),
    param2: isNaN(elements[2]) ? elements[2] : parseInt(elements[2]),
  }
})

let idx = 0
let result = 0
while (idx >= 0 && idx < instructions.length) {
  const instruction = instructions[idx]
  const param2 = isNaN(instruction.param2) ? registers[instruction.param2] : instruction.param2

  switch (instruction.operation) {
    case 'set':
      registers[instruction.param1] = param2
      break
    case 'sub':
      registers[instruction.param1] -= param2
      break
    case 'mul':
      registers[instruction.param1] *= param2
      result++
      break
    case 'jnz':
      if ((isNaN(instruction.param1) ? registers[instruction.param1] : instruction.param1) !== 0) {
        idx += param2 - 1
      }
      break
  }

  idx++
}

console.log(result)
