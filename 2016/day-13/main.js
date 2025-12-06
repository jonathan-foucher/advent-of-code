import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const FAV_NUMBER = parseInt(readFile(FILE_NAME)[0])
const TARGET_X = 31,
  TARGET_Y = 39
const LIMIT_X = TARGET_X * 2,
  LIMIT_Y = TARGET_Y * 2
const MAP_WALLS = []
for (let y = 0; y <= LIMIT_Y; y++) {
  MAP_WALLS.push([])
  for (let x = 0; x <= LIMIT_X; x++) {
    const value = x * x + 3 * x + 2 * x * y + y + y * y + FAV_NUMBER
    let i = 0,
      counter = 0
    while (value >>> i > 0) {
      if ((value >>> i) % 2 === 1) {
        counter++
      }
      i++
    }
    MAP_WALLS[y].push(counter % 2 === 1)
  }
}

let best = Infinity
const getLowestSteps = (x, y, steps, alreadyVisited) => {
  const key = `${x}-${y}`
  if (best < steps || alreadyVisited.includes(key)) {
    return
  }
  alreadyVisited.push(key)

  if (x === TARGET_X && y === TARGET_Y) {
    best = steps
    return steps
  }

  let results = []

  if (x > 0 && !MAP_WALLS[y][x - 1]) {
    results.push(getLowestSteps(x - 1, y, steps + 1, [...alreadyVisited]))
  }

  if (x < LIMIT_X && !MAP_WALLS[y][x + 1]) {
    results.push(getLowestSteps(x + 1, y, steps + 1, [...alreadyVisited]))
  }

  if (y > 0 && !MAP_WALLS[y - 1][x]) {
    results.push(getLowestSteps(x, y - 1, steps + 1, [...alreadyVisited]))
  }

  if (y < LIMIT_Y && !MAP_WALLS[y + 1][x]) {
    results.push(getLowestSteps(x, y + 1, steps + 1, [...alreadyVisited]))
  }

  results = results.filter((e) => e)
  return Math.min(...results)
}

const result = getLowestSteps(1, 1, 0, [])

console.log(result)
