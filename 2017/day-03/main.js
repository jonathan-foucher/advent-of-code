import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const target = parseInt(readFile(FILE_NAME)[0])

const DIRECTIONS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

const getTargetPosition = (target, n = 1, x = 0, y = 0, shift = 1, nextTurn = 1, direction = 0) => {
  if (n === target) {
    return { x, y }
  }

  if (nextTurn === 0) {
    direction = (direction + 1) % 4
    if (direction % 2 === 0) {
      shift++
    }
    nextTurn = shift
  }

  return getTargetPosition(
    target,
    n + 1,
    x + DIRECTIONS[direction][0],
    y + DIRECTIONS[direction][1],
    shift,
    nextTurn - 1,
    direction
  )
}

const targetPosition = getTargetPosition(target)
const result = Math.abs(targetPosition.x) + Math.abs(targetPosition.y)
console.log(result)
