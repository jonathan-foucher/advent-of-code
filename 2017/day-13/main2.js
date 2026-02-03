import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const scanners = readFile(FILE_NAME).map((line) => {
  const extracted = line.split(': ')
  return {
    depth: parseInt(extracted[0]),
    range: parseInt(extracted[1]),
    y: 0,
    shift: -1,
  }
})

for (const scanner of scanners) {
  for (let _ = 0; _ < scanner.depth; _++) {
    scanner.y -= scanner.shift
    if (scanner.y === scanner.range - 1 || scanner.y === 0) {
      scanner.shift = -scanner.shift
    }
  }
  scanner.shift = -scanner.shift
}

let result = 1
while (true) {
  for (const scanner of scanners) {
    scanner.y += scanner.shift
    if (scanner.y === scanner.range - 1 || scanner.y === 0) {
      scanner.shift = -scanner.shift
    }
  }

  if (scanners.every((scanner) => scanner.y !== 0)) {
    break
  }
  result++
}

console.log(result)
