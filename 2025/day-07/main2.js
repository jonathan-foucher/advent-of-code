import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const MATRIX = readFile(FILE_NAME).map((line) => line.replace('S', '|').split(''))

const HEIGHT = MATRIX.length
const X0 = MATRIX[0].findIndex((c) => c === '|')

const cache = new Map()

const getTimeLineSum = (x, y) => {
  if (y === HEIGHT) {
    return 1
  }

  const key = `${x}-${y}`
  const cachedResult = cache.get(key)
  if (cachedResult) {
    return cachedResult
  }

  if (y + 1 < HEIGHT && MATRIX[y + 1][x] === '^') {
    const sum = getTimeLineSum(x - 1, y + 1) + getTimeLineSum(x + 1, y + 1)
    cache.set(key, sum)
    return sum
  }

  const sum = getTimeLineSum(x, y + 1)
  cache.set(key, sum)
  return sum
}

let result = getTimeLineSum(X0, 0)

console.log(result)
