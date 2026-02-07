import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_BURST = 10000000

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

const STATES = {
  CLEAN: 'clean',
  WEAKENED: 'weakened',
  INFECTED: 'infected',
  FLAGGED: 'flagged',
}

const lines = readFile(FILE_NAME)
let nodes = new Map()
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines.length; x++) {
    if (lines[y][x] === '#') {
      const key = `${x}_${y}`
      nodes.set(key, STATES.INFECTED)
    }
  }
}
let x = (lines.length - 1) / 2
let y = (lines.length - 1) / 2
let directionIndex = 0
let result = 0
for (let _ = 0; _ < NUMBER_OF_BURST; _++) {
  const key = `${x}_${y}`
  const state = nodes.get(key) ?? STATES.CLEAN

  let directionShift
  let newState
  switch (state) {
    case STATES.CLEAN:
      directionShift = 3
      newState = STATES.WEAKENED
      break
    case STATES.WEAKENED:
      directionShift = 0
      result++
      newState = STATES.INFECTED
      break
    case STATES.INFECTED:
      directionShift = 1
      newState = STATES.FLAGGED
      break
    case STATES.FLAGGED:
      directionShift = 2
      newState = STATES.CLEAN
      break
  }

  directionIndex = (directionIndex + directionShift) % 4
  nodes.set(key, newState)
  y += DIRECTIONS[directionIndex][0]
  x += DIRECTIONS[directionIndex][1]
}

console.log(result)
