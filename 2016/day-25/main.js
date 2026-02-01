import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const LIMIT = 10000
let a = 0
let nOutputs = 0

const instructions = readFile(FILE_NAME).map((line) => {
  const splitted = line.split(' ')
  const params = [splitted[1], splitted[2]]
    .filter((param) => param)
    .map((param) => {
      if (!isNaN(parseInt(param))) {
        return parseInt(param)
      }
      return param
    })
  return { action: splitted[0], params }
})

const PROGRAM_LENGTH = instructions.length

while (nOutputs < LIMIT) {
  let registers = { a, b: 0, c: 0, d: 0 }
  let output = 1
  nOutputs = 0

  let i = 0
  let isError = false
  while (i < PROGRAM_LENGTH && i >= 0 && !isError && nOutputs < LIMIT) {
    const instruction = instructions[i]
    switch (instruction.action) {
      case 'cpy': {
        let cpy = isNaN(instruction.params[0]) ? registers[instruction.params[0]] : instruction.params[0]
        registers[instruction.params[1]] = cpy
        break
      }
      case 'inc':
        registers[instruction.params[0]]++
        break

      case 'dec':
        registers[instruction.params[0]]--
        break

      case 'jnz': {
        let value = isNaN(instruction.params[0]) ? registers[instruction.params[0]] : instruction.params[0]
        if (value !== 0) {
          let jumpLength = isNaN(instruction.params[1]) ? registers[instruction.params[1]] : instruction.params[1]
          i += jumpLength - 1
        }
        break
      }

      case 'out': {
        let value = isNaN(instruction.params[0]) ? registers[instruction.params[0]] : instruction.params[0]
        if (output + value === 1) {
          nOutputs++
          output = value
        } else {
          isError = true
        }
        break
      }
    }
    i++
  }

  if (nOutputs < LIMIT) {
    a++
  }
}

console.log(a)
