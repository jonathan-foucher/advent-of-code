import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const N_STEPS = 100
const GRID_SIZE = 100

const lines = readFile(FILE_NAME)
let lights = []
for (let y = 0; y < GRID_SIZE; y++) {
  const line = lines[y].split('')
  lights.push([])
  for (let x = 0; x < GRID_SIZE; x++) {
    const isCorner = (x === 0 || x === GRID_SIZE - 1) && (y === 0 || y === GRID_SIZE - 1)
    lights[y].push(line[x] === '#' || isCorner)
  }
}

for (let _ = 0; _ < N_STEPS; _++) {
  const newLights = []

  for (let y = 0; y < GRID_SIZE; y++) {
    newLights.push([])
    for (let x = 0; x < GRID_SIZE; x++) {
      const isCorner = (x === 0 || x === GRID_SIZE - 1) && (y === 0 || y === GRID_SIZE - 1)
      if (isCorner) {
        newLights[y].push(true)
        continue
      }

      let countNextLights = 0
      if (y > 0 && x > 0 && lights[y - 1][x - 1]) {
        countNextLights++
      }
      if (y > 0 && lights[y - 1][x]) {
        countNextLights++
      }
      if (y > 0 && x < GRID_SIZE - 1 && lights[y - 1][x + 1]) {
        countNextLights++
      }

      if (x > 0 && lights[y][x - 1]) {
        countNextLights++
      }
      if (x < GRID_SIZE - 1 && lights[y][x + 1]) {
        countNextLights++
      }

      if (y < GRID_SIZE - 1 && x > 0 && lights[y + 1][x - 1]) {
        countNextLights++
      }
      if (y < GRID_SIZE - 1 && lights[y + 1][x]) {
        countNextLights++
      }
      if (y < GRID_SIZE - 1 && x < GRID_SIZE - 1 && lights[y + 1][x + 1]) {
        countNextLights++
      }

      newLights[y].push(countNextLights === 3 || (countNextLights === 2 && lights[y][x]))
    }
  }

  lights = newLights
}

let result = 0
for (let y = 0; y < GRID_SIZE; y++) {
  for (let x = 0; x < GRID_SIZE; x++) {
    if (lights[y][x]) {
      result++
    }
  }
}

console.log(result)
