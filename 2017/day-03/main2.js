import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const target = parseInt(readFile(FILE_NAME)[0])

const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const DIAGONALS = [
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
]

const getNextNumber = (target, values, x = 1, y = 0, shift = 1, nextTurn = 0, direction = 0) => {
  let newValue = 0
  for (const d of DIRECTIONS) {
    newValue += values.get(`${x + d[0]}-${y + d[1]}`) ?? 0
  }
  for (const d of DIAGONALS) {
    newValue += values.get(`${x + d[0]}-${y + d[1]}`) ?? 0
  }

  if (newValue > target) {
    return newValue
  }
  values.set(`${x}-${y}`, newValue)

  if (nextTurn === 0) {
    direction = (direction + 1) % 4
    if (direction % 2 === 0) {
      shift++
    }
    nextTurn = shift
  }

  return getNextNumber(
    target,
    values,
    x + DIRECTIONS[direction][0],
    y + DIRECTIONS[direction][1],
    shift,
    nextTurn - 1,
    direction
  )
}

const values = new Map()
values.set('0-0', 1)

const result = getNextNumber(target, values)
console.log(result)
