import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let registers = { a: 12, b: 0, c: 0, d: 0 }

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

let i = 0
while (i < PROGRAM_LENGTH && i >= 0) {
  const instruction = instructions[i]
  switch (instruction.action) {
    case 'cpy': {
      let cpy = isNaN(instruction.params[0]) ? registers[instruction.params[0]] : instruction.params[0]
      if (registers[instruction.params[1]] !== undefined) {
        registers[instruction.params[1]] = cpy
      }
      break
    }
    case 'inc':
      if (registers[instruction.params[0]] !== undefined) {
        registers[instruction.params[0]]++
      }
      break

    case 'dec':
      if (registers[instruction.params[0]] !== undefined) {
        registers[instruction.params[0]]--
      }
      break

    case 'jnz': {
      let value = isNaN(instruction.params[0]) ? registers[instruction.params[0]] : instruction.params[0]
      if (value !== 0) {
        let jumpLength = isNaN(instruction.params[1]) ? registers[instruction.params[1]] : instruction.params[1]
        i += jumpLength - 1
      }
      break
    }

    case 'tgl': {
      const tglIndex = i + (isNaN(instruction.params[0]) ? registers[instruction.params[0]] : instruction.params[0])
      if (tglIndex < PROGRAM_LENGTH && tglIndex >= 0) {
        const tglInstruction = instructions[tglIndex]

        if (tglInstruction.params.length === 1) {
          tglInstruction.action = tglInstruction.action === 'inc' ? 'dec' : 'inc'
        } else {
          tglInstruction.action = tglInstruction.action === 'jnz' ? 'cpy' : 'jnz'
        }
      }
      break
    }
  }
  i++
}

console.log(registers.a)
