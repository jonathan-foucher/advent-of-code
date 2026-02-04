import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const NUMBER_OF_PROGRAMS = IS_EXAMPLE ? 5 : 16

const SPIN_REGEX = /^s(?<shift>\d+)$/
const EXCHANGE_REGEX = /^x(?<indexA>\d+)\/(?<indexB>\d+)$/
const PARTNER_REGEX = /^p(?<programA>[a-z])\/(?<programB>[a-z])$/

const moves = readFile(FILE_NAME)[0].split(',')

const programs = []
let currentProgram = 'a'
for (let _ = 0; _ < NUMBER_OF_PROGRAMS; _++) {
  programs.push(currentProgram)
  currentProgram = String.fromCharCode(currentProgram.charCodeAt(0) + 1)
}

for (const move of moves) {
  if (SPIN_REGEX.test(move)) {
    const shift = SPIN_REGEX.exec(move).groups['shift']
    for (let _ = 0; _ < shift; _++) {
      programs.unshift(programs.pop())
    }
  } else if (EXCHANGE_REGEX.test(move)) {
    const regexResult = EXCHANGE_REGEX.exec(move)
    const indexA = regexResult.groups['indexA']
    const indexB = regexResult.groups['indexB']

    const valueA = programs[indexA]
    const valueB = programs[indexB]

    programs[indexA] = valueB
    programs[indexB] = valueA
  } else {
    const regexResult = PARTNER_REGEX.exec(move)
    const programA = regexResult.groups['programA']
    const programB = regexResult.groups['programB']

    const indexA = programs.findIndex((value) => value === programA)
    const indexB = programs.findIndex((value) => value === programB)

    const valueA = programs[indexA]
    const valueB = programs[indexB]

    programs[indexA] = valueB
    programs[indexB] = valueA
  }
}

const result = programs.join('')
console.log(result)
