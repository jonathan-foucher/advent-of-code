import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

const MAX_STEPS = 100000

let guardInitRow = -1
let guardInitCol = -1

let guardRow = -1
let guardCol = -1

let height = lines.length
let width = lines[0].length

let row = 0
let id = -1
const matrix = lines
  .map(line => {
    let col = -1
    const res = line.split('').map(value => {
      col++
      id++
      if (value === '^') {
        guardInitRow = row
        guardInitCol = col
      }
      return { value: value === '^' ? '.' : value, row, col, isObstacle: value === '#', id, isGuardInitPos: value === '^' }
    })
    row++
    return res
  })

let dir = 0
const nextDir = () => {
  dir = (dir + 1) % 4
}

const isGuardOut = () => guardRow < 0 || guardCol < 0 || guardRow >= width || guardCol >= height

const moveGuard = () => {
  let nextRow = guardRow
  let nextCol = guardCol

  if (dir === 0) {
    nextRow = nextRow - 1
  } else if (dir === 1) {
    nextCol = nextCol + 1
  } else if (dir === 2) {
    nextRow = nextRow + 1
  } else if (dir === 3) {
    nextCol = nextCol - 1
  } else {
    console.error('impossible dir')
  }

  if (matrix[nextRow] && matrix[nextRow][nextCol] && matrix[nextRow][nextCol].isObstacle) {
    nextDir()
    moveGuard()
    return
  }

  guardRow = nextRow
  guardCol = nextCol
}

const isNextPositionObstacle = () => {
  let nextRow = guardRow
  let nextCol = guardCol

  if (dir === 0) {
    nextRow = nextRow - 1
  } else if (dir === 1) {
    nextCol = nextCol + 1
  } else if (dir === 2) {
    nextRow = nextRow + 1
  } else if (dir === 3) {
    nextCol = nextCol - 1
  } else {
    console.error('impossible dir')
  }

  return matrix[nextRow] && matrix[nextRow][nextCol] && matrix[nextRow][nextCol].isObstacle
}

const isGuardInitialState = () => guardInitRow === guardRow
  && guardInitCol === guardCol
  && dir === -1
  && isNextPositionObstacle()


let result = 0
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    if (!matrix[i][j].isGuardInitPos && !matrix[i][j].isObstacle) {
      guardRow = guardInitRow
      guardCol = guardInitCol
      dir = 0
      matrix[i][j].isObstacle = true
      
      let steps = 0
      do {
        moveGuard()
        steps++
      } while (!isGuardOut() && !isGuardInitialState() && steps < MAX_STEPS)

      if (isGuardInitialState() || steps === MAX_STEPS) {
        result++
      }

      matrix[i][j].isObstacle = false
    }
  }
}

console.log(result)
