import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_GENERATIONS = 50000000000

const lines = readFile(FILE_NAME)
const states = /^initial state: (?<states>[.#]+)$/
  .exec(lines[0])
  .groups['states'].split('')
  .map((state) => (state === '#' ? 1 : 0))

let pot = null
for (let id = 0; id < states.length; id++) {
  const temp = {
    id,
    state: states[id],
    prev: pot,
    next: null,
  }

  if (pot !== null) {
    pot.next = temp
  }
  pot = temp
}

const notes = new Map()
for (let i = 2; i < lines.length; i++) {
  const regexResult = /^(?<pattern>[.#]{5}) => (?<newState>[.#])$/.exec(lines[i])
  const pattern = parseInt(regexResult.groups['pattern'].replaceAll('#', 1).replaceAll('.', 0), 2)
  const newState = regexResult.groups['newState'] === '#' ? 1 : 0
  notes.set(pattern, newState)
}

let nextGenPot = null
let score = 0
let previousScore = 0
let differences = []
let result
for (let i = 0; i < NUMBER_OF_GENERATIONS; i++) {
  const difference = score - previousScore
  differences.push(difference)
  if (differences.length > 100) {
    differences.shift()
    if (differences.every((value) => value === difference)) {
      result = score + (NUMBER_OF_GENERATIONS - i) * difference
      break
    }
  }
  previousScore = score
  for (let _ = 0; _ < 4; _++) {
    const temp = {
      id: pot.id + 1,
      state: 0,
      prev: pot,
      next: null,
    }

    pot.next = temp
    pot = temp
  }

  while (pot.prev !== null) {
    pot = pot.prev
  }

  for (let _ = 0; _ < 4; _++) {
    const temp = {
      id: pot.id - 1,
      state: 0,
      prev: null,
      next: pot,
    }

    pot.prev = temp
    pot = temp
  }

  for (let _ = 0; _ < 2; _++) {
    pot = pot.next
  }

  nextGenPot = null
  score = 0
  while (pot.next.next !== null) {
    const pattern = parseInt(
      `${pot.prev.prev.state}${pot.prev.state}${pot.state}${pot.next.state}${pot.next.next.state}`,
      2
    )

    if (notes.get(pattern) === 1) {
      score += pot.id
    }
    const temp = {
      id: pot.id,
      state: notes.get(pattern) ?? 0,
      prev: nextGenPot,
      next: null,
    }

    if (nextGenPot) {
      nextGenPot.next = temp
    }
    nextGenPot = temp
    pot = pot.next
  }

  pot = nextGenPot
}

console.log(result)
