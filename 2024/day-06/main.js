import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME)

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
        guardRow = row
        guardCol = col
      }
      return { value: value === '^' ? '.' : value, row, col, isObstacle: value === '#', id }
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

const results = [ matrix[guardRow][guardCol].id ]

while (!isGuardOut()) {
  moveGuard()

  if (matrix[guardRow] && matrix[guardRow][guardCol]) {
    const id = matrix[guardRow][guardCol].id
    if (!results.includes(id)) {
      results.push(id)
    }
  }
}

console.log(results.length)
