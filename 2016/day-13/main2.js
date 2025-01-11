import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const FAV_NUMBER = parseInt(readFile(FILE_NAME)[0])
const MAX_STEPS = 50
const LIMIT_X = MAX_STEPS, LIMIT_Y = MAX_STEPS
const MAP_WALLS = []
for (let y = 0; y <= LIMIT_Y; y++) {
  MAP_WALLS.push([])
  for (let x = 0; x <= LIMIT_X; x++) {
    const value = x * x + 3 * x + 2 * x * y + y + y * y + FAV_NUMBER
    let i = 0, counter = 0
    while (value >>> i > 0) {
      if ((value >>> i) % 2 === 1) {
        counter++
      }
      i++
    }
    MAP_WALLS[y].push(counter % 2 === 1)
  }
}

const getLowestSteps = (x, y, steps, alreadyVisited) => {
  const key = `${x}-${y}`
  if (alreadyVisited.includes(key)) {
    return alreadyVisited
  }
  alreadyVisited.push(key)

  if (steps === MAX_STEPS) {
    return alreadyVisited
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

  results = results.filter(e => e)
  return results.flatMap(e => e)
    .reduce((acc, val) => {
      if (!acc.includes(val)) {
        acc.push(val)
      }
      return acc
    }, [])
}

const result = getLowestSteps(1, 1, 0, []).length

console.log(result)
