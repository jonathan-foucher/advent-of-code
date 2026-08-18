import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const LINES = readFile(FILE_NAME)
const DEPTH = Number.parseInt(/^depth: (?<depth>\d+)$/.exec(LINES[0]).groups.depth)
const X_TARGET = Number.parseInt(/^target: (?<x>\d+),\d+$/.exec(LINES[1]).groups.x)
const Y_TARGET = Number.parseInt(/^target: \d+,(?<y>\d+)$/.exec(LINES[1]).groups.y)

const regions = new Map()

for (let x = 0; x <= X_TARGET; x++) {
  for (let y = 0; y <= Y_TARGET; y++) {
    const key = `${x}-${y}`

    let geoIndex = null
    if (x === 0) {
      geoIndex = y * 48271
    } else if (y === 0) {
      geoIndex = x * 16807
    } else if (x === X_TARGET && y === Y_TARGET) {
      geoIndex = 0
    } else {
      geoIndex = regions.get(`${x - 1}-${y}`) * regions.get(`${x}-${y - 1}`)
    }

    const erosionLevel = (geoIndex + DEPTH) % 20183
    regions.set(key, erosionLevel)
  }
}

const result = [...regions.values()].reduce((acc, val) => acc + (val % 3), 0)
console.log(result)
