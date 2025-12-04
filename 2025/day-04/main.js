import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const GRID = readFile(FILE_NAME).map(line => line.split(''))

const HEIGHT = GRID.length
const WIDTH = GRID[0].length

const SHIFTS = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
]

const isRoll = (x, y) => {
  if (x >= 0 && y >= 0 && x < WIDTH && y < HEIGHT && GRID[y][x] === '@') {
    return 1
  }
  return 0
}

const hasLessThanFourAdjacentRoll = (x, y) => {
  let n = 0

  for (let i = 0; i < SHIFTS.length; i++) {
    if (isRoll(x + SHIFTS[i].x, y + SHIFTS[i].y)) {
      n++
    }
  }

  return n < 4
}

let result = 0

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    if (GRID[y][x] === '@' && hasLessThanFourAdjacentRoll(x, y)) {
      result += 1
    }
  }
}

console.log(result)
