import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const scanners = readFile(FILE_NAME).map((line) => {
  const extracted = line.split(': ')
  return {
    depth: parseInt(extracted[0]),
    range: parseInt(extracted[1]),
    y: 0,
    shift: 1,
  }
})

const MAX_LAYER = Math.max(...scanners.map((scanner) => scanner.depth))

let x = -1
let result = 0
while (x <= MAX_LAYER) {
  x++
  const layerScanner = scanners.find((scanner) => scanner.depth === x)
  if (layerScanner?.y === 0) {
    result += layerScanner.depth * layerScanner.range
  }

  for (const scanner of scanners) {
    scanner.y += scanner.shift
    if (scanner.y === scanner.range - 1 || scanner.y === 0) {
      scanner.shift = -scanner.shift
    }
  }
}

console.log(result)
