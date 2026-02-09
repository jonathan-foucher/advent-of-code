import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'
const GRID_SIZE = 300
const POWER_CELLS_SIZE = 3

const GRID_SERIAL_NUMBER = parseInt(readFile(FILE_NAME)[0])

const cellPowers = new Map()
for (let x = 1; x <= GRID_SIZE; x++) {
  for (let y = 1; y <= GRID_SIZE; y++) {
    const rackId = x + 10
    let power = (rackId * y + GRID_SERIAL_NUMBER) * rackId
    power = (power < 100 ? 0 : parseInt(`${power}`.charAt(`${power}`.length - 3))) - 5
    cellPowers.set(`${x}-${y}`, power)
  }
}

let maxTotalPower = -Infinity
let result = null
for (let x = 1; x <= GRID_SIZE - POWER_CELLS_SIZE + 1; x++) {
  for (let y = 1; y <= GRID_SIZE - POWER_CELLS_SIZE + 1; y++) {
    let totalPower = 0

    for (let x2 = x; x2 < x + POWER_CELLS_SIZE; x2++) {
      for (let y2 = y; y2 < y + POWER_CELLS_SIZE; y2++) {
        totalPower += cellPowers.get(`${x2}-${y2}`)
      }
    }
    if (totalPower > maxTotalPower) {
      maxTotalPower = totalPower
      result = `${x},${y}`
    }
  }
}

console.log(result)
