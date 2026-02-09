import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'
const GRID_SIZE = 300

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
for (let x = 1; x <= GRID_SIZE; x++) {
  for (let y = 1; y <= GRID_SIZE; y++) {
    let totalPower = 0
    for (let i = 0; i <= GRID_SIZE - Math.max(x, y); i++) {
      for (let x2 = x; x2 < x + i; x2++) {
        totalPower += cellPowers.get(`${x2}-${y + i}`)
      }

      for (let y2 = y; y2 < y + i; y2++) {
        totalPower += cellPowers.get(`${x + i}-${y2}`)
      }

      totalPower += cellPowers.get(`${x + i}-${y + i}`)

      if (totalPower > maxTotalPower) {
        maxTotalPower = totalPower
        result = `${x},${y},${i + 1}`
      }
    }
  }
}

console.log(result)
