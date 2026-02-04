import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const NUMBER_OF_PROGRAMS = IS_EXAMPLE ? 5 : 16
const NUMBER_OF_DANCES = 1000000000

const SPIN_REGEX = /^s(?<shift>\d+)$/
const EXCHANGE_REGEX = /^x(?<indexA>\d+)\/(?<indexB>\d+)$/
const PARTNER_REGEX = /^p(?<programA>[a-z])\/(?<programB>[a-z])$/

const moves = readFile(FILE_NAME)[0]
  .split(',')
  .map((move) => {
    let shift, indexA, indexB, programA, programB

    if (SPIN_REGEX.test(move)) {
      shift = parseInt(SPIN_REGEX.exec(move).groups['shift'])
    } else if (EXCHANGE_REGEX.test(move)) {
      const regexResult = EXCHANGE_REGEX.exec(move)
      indexA = parseInt(regexResult.groups['indexA'])
      indexB = parseInt(regexResult.groups['indexB'])
    } else {
      const regexResult = PARTNER_REGEX.exec(move)
      programA = regexResult.groups['programA']
      programB = regexResult.groups['programB']
    }

    return {
      shift,
      indexA,
      indexB,
      programA,
      programB,
    }
  })

const programs = []
let currentProgram = 'a'
for (let i = 0; i < NUMBER_OF_PROGRAMS; i++) {
  programs.push({ id: currentProgram, position: i })
  currentProgram = String.fromCharCode(currentProgram.charCodeAt(0) + 1)
}

let cache = new Map()
for (let i = 0; i < NUMBER_OF_DANCES; i++) {
  if (cache !== null) {
    const key = programs
      .sort((a, b) => a.position - b.position)
      .map((program) => program.id)
      .join('')

    if (cache.get(key) !== undefined) {
      cache = null
      const loopIndex = i
      while (i + loopIndex < NUMBER_OF_DANCES - 1) {
        i = i + loopIndex
      }
    } else {
      cache.set(key, i)
    }
  }

  for (const move of moves) {
    if (move.shift !== undefined) {
      for (const program of programs) {
        program.position = (program.position + move.shift) % NUMBER_OF_PROGRAMS
      }
    } else if (move.indexA !== undefined) {
      const programA = programs.find((program) => program.position === move.indexA)
      const programB = programs.find((program) => program.position === move.indexB)

      programA.position = move.indexB
      programB.position = move.indexA
    } else {
      const programA = programs.find((program) => program.id === move.programA)
      const programB = programs.find((program) => program.id === move.programB)

      const temp = programA.position
      programA.position = programB.position
      programB.position = temp
    }
  }
}

const result = programs
  .sort((a, b) => a.position - b.position)
  .map((program) => program.id)
  .join('')

console.log(result)
