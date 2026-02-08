import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const MAX_TOTAL_DISTANCE = IS_EXAMPLE ? 32 : 10000

const coordinates = readFile(FILE_NAME).map((line) => {
  const [x, y] = line.split(', ').map((str) => parseInt(str))
  return { x, y }
})

let minX = Infinity
let minY = Infinity
let maxX = 0
let maxY = 0
for (const coordinate of coordinates) {
  if (coordinate.x < minX) {
    minX = coordinate.x
  }

  if (coordinate.y < minY) {
    minY = coordinate.y
  }

  if (coordinate.x > maxX) {
    maxX = coordinate.x
  }

  if (coordinate.y > maxY) {
    maxY = coordinate.y
  }
}

let result = 0
for (let x = minX - 2; x <= maxX + 2; x++) {
  for (let y = minY - 2; y <= maxY + 2; y++) {
    let distance = 0
    for (const coordinate of coordinates) {
      distance += Math.abs(x - coordinate.x) + Math.abs(y - coordinate.y)
    }

    if (distance < MAX_TOTAL_DISTANCE) {
      result++
    }
  }
}

console.log(result)
