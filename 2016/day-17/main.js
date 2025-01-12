import { readFile } from '../../utils/javascript/file-utils'
import { md5 } from '../../utils/javascript/crypto-utils'

const FILE_NAME = 'input/input.txt'

const PASSCODE = readFile(FILE_NAME)[0]
const GRID_MAX = 3
const OPEN_CHARS = [ 'b', 'c', 'd', 'e', 'f' ]

let best = Infinity
const getShortestPath = (path, x, y) => {
  if (path.length > best) {
    return
  }

  if (x === GRID_MAX && y === GRID_MAX) {
    best = path.length
    return path
  }

  let results = []
  const hash = md5(PASSCODE + path)

  if (y > 0 && OPEN_CHARS.includes(hash[0])) {
    results.push(getShortestPath(path + 'U', x, y - 1))
  }

  if (y < GRID_MAX && OPEN_CHARS.includes(hash[1])) {
    results.push(getShortestPath(path + 'D', x, y + 1))
  }

  if (x > 0 && OPEN_CHARS.includes(hash[2])) {
    results.push(getShortestPath(path + 'L', x - 1, y))
  }

  if (x < GRID_MAX && OPEN_CHARS.includes(hash[3])) {
    results.push(getShortestPath(path + 'R', x + 1, y))
  }

  results = results.filter(e => e)
  if (results.length === 0) {
    return
  }

  let shortestPath = results[0]
  for (let i = 1; i < results.length; i++) {
    let result = results[i]
    if (shortestPath.length > result.length) {
      shortestPath = result
    }
  }
  return shortestPath
}

const result = getShortestPath('', 0, 0)

console.log(result)
