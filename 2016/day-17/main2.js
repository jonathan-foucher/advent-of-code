import { readFile } from '../../utils/file-utils.js'
import { md5 } from '../../utils/crypto-utils.js'

const FILE_NAME = 'input/input.txt'

const PASSCODE = readFile(FILE_NAME)[0]
const GRID_MAX = 3
const OPEN_CHARS = ['b', 'c', 'd', 'e', 'f']

const getLongestPathLength = (path, x, y) => {
  if (x === GRID_MAX && y === GRID_MAX) {
    return path.length
  }

  let results = []
  const hash = md5(PASSCODE + path)

  if (y > 0 && OPEN_CHARS.includes(hash[0])) {
    results.push(getLongestPathLength(path + 'U', x, y - 1))
  }

  if (y < GRID_MAX && OPEN_CHARS.includes(hash[1])) {
    results.push(getLongestPathLength(path + 'D', x, y + 1))
  }

  if (x > 0 && OPEN_CHARS.includes(hash[2])) {
    results.push(getLongestPathLength(path + 'L', x - 1, y))
  }

  if (x < GRID_MAX && OPEN_CHARS.includes(hash[3])) {
    results.push(getLongestPathLength(path + 'R', x + 1, y))
  }

  return Math.max(...results, -1)
}

const result = getLongestPathLength('', 0, 0)

console.log(result)
