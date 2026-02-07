import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_BURST = 10000

const DIRECTIONS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]

const lines = readFile(FILE_NAME)
let infected = []
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines.length; x++) {
    if (lines[y][x] === '#') {
      const key = `${x}_${y}`
      infected.push(key)
    }
  }
}
let x = (lines.length - 1) / 2
let y = (lines.length - 1) / 2
let directionIndex = 0
let result = 0
for (let _ = 0; _ < NUMBER_OF_BURST; _++) {
  const key = `${x}_${y}`

  if (infected.includes(key)) {
    directionIndex = (directionIndex + 1) % 4
    infected = infected.filter((i) => i !== key)
  } else {
    directionIndex = (directionIndex + 3) % 4
    infected.push(key)
    result++
  }

  y += DIRECTIONS[directionIndex][0]
  x += DIRECTIONS[directionIndex][1]
}

console.log(result)
