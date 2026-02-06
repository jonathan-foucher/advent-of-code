import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const registers = {}
const instructions = readFile(FILE_NAME).map((line) => {
  const regexResult = /^(?<operation>[a-z]+) (?<param1>-?\d+|[a-z])($| (?<param2>-?\d+|[a-z])$)/.exec(line)

  const param1 = isNaN(regexResult.groups['param1'])
    ? regexResult.groups['param1']
    : parseInt(regexResult.groups['param1'])

  if (isNaN(param1)) {
    if (registers[param1] === undefined) {
      registers[param1] = 0
    }
  }

  return {
    operation: regexResult.groups['operation'],
    param1,
    param2: isNaN(regexResult.groups['param2']) ? regexResult.groups['param2'] : parseInt(regexResult.groups['param2']),
  }
})

let result = 0
let cursor = 0
let sound = 0
while (result === 0) {
  const operation = instructions[cursor].operation
  const param1 = instructions[cursor].param1

  let param2 = instructions[cursor].param2
  if (param2 !== undefined && isNaN(param2)) {
    param2 = registers[param2]
  }

  switch (operation) {
    case 'snd':
      sound = registers[param1]
      break
    case 'set':
      registers[param1] = param2
      break
    case 'add':
      registers[param1] += param2
      break
    case 'mul':
      registers[param1] *= param2
      break
    case 'mod':
      registers[param1] %= param2
      break
    case 'rcv':
      if (registers[param1] !== 0) {
        result = sound
      }
      break
    case 'jgz':
      if ((isNaN(param1) ? registers[param1] : param1) > 0) {
        cursor += param2 - 1
      }
      break
  }

  cursor++
}

console.log(result)
