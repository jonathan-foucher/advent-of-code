import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const registers = [{}, {}]
const instructions = readFile(FILE_NAME).map((line) => {
  const regexResult = /^(?<operation>[a-z]+) (?<param1>-?\d+|[a-z])($| (?<param2>-?\d+|[a-z])$)/.exec(line)

  const param1 = isNaN(regexResult.groups['param1'])
    ? regexResult.groups['param1']
    : parseInt(regexResult.groups['param1'])

  if (isNaN(param1)) {
    if (registers[0][param1] === undefined) {
      registers[0][param1] = 0
      registers[1][param1] = param1 === 'p' ? 1 : 0
    }
  }

  return {
    operation: regexResult.groups['operation'],
    param1,
    param2: isNaN(regexResult.groups['param2']) ? regexResult.groups['param2'] : parseInt(regexResult.groups['param2']),
  }
})

let result = 0
let cursors = [0, 0]
let queues = [[], []]
while (
  queues[0].length > 0
  || instructions[cursors[0]].operation !== 'rcv'
  || queues[1].length > 0
  || instructions[cursors[1]].operation !== 'rcv'
) {
  for (let id = 0; id < 2; id++) {
    const operation = instructions[cursors[id]].operation
    const param1 = instructions[cursors[id]].param1

    let param2 = instructions[cursors[id]].param2
    if (isNaN(param2)) {
      param2 = registers[id][param2]
    }

    switch (operation) {
      case 'snd':
        queues[1 - id].push(registers[id][param1])
        if (id === 1) {
          result++
        }
        break
      case 'set':
        registers[id][param1] = param2
        break
      case 'add':
        registers[id][param1] += param2
        break
      case 'mul':
        registers[id][param1] *= param2
        break
      case 'mod':
        registers[id][param1] %= param2
        break
      case 'rcv':
        if (queues[id].length > 0) {
          registers[id][param1] = queues[id].shift()
        } else {
          cursors[id]--
        }
        break
      case 'jgz':
        if ((isNaN(param1) ? registers[id][param1] : param1) > 0) {
          cursors[id] += param2 - 1
        }
        break
    }

    cursors[id]++
  }
}

console.log(result)
