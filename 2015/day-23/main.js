import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const instructions = readFile(FILE_NAME).map((line) => {
  const name = /^[a-z]{3}(?= )/.exec(line)[0]
  const register = /(?<=^[a-z]{3} )[a-z]/.exec(line) ? /(?<=^[a-z]{3} )[a-z]/.exec(line)[0] : undefined
  const offset = /(?<= )[+-]\d+/.exec(line) ? parseInt(/(?<= )[+-]\d+/.exec(line)[0]) : undefined
  return { name, register, offset }
})

let i = 0
const registers = { a: 0, b: 0 }
while (i >= 0 && i < instructions.length) {
  const name = instructions[i].name
  const r = instructions[i].register
  const offset = instructions[i].offset

  if (name === 'hlf') {
    registers[r] = Math.floor(registers[r] / 2)
    i++
    continue
  }

  if (name === 'tpl') {
    registers[r] = 3 * registers[r]
    i++
    continue
  }

  if (name === 'inc') {
    registers[r] += 1
    i++
    continue
  }

  if (name === 'jmp') {
    registers[r] += 1
    i += offset
    continue
  }

  if (name === 'jie') {
    if (registers[r] % 2 === 0) {
      i += offset
    } else {
      i++
    }
    continue
  }

  if (name === 'jio') {
    if (registers[r] === 1) {
      i += offset
    } else {
      i++
    }
    continue
  }
}

console.log(registers['b'])
