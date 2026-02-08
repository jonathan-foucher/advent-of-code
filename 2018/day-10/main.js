import { readFile } from '../../utils/file-utils.js'
import { print } from '../../utils/matrix-utils.js'

const FILE_NAME = 'input/input.txt'
const THRESHOLD = 70

const points = readFile(FILE_NAME).map((line) => {
  const regexResult = /position=<\s*(?<px>-?\d+),\s*(?<py>-?\d+)> velocity=<\s*(?<vx>-?\d+),\s*(?<vy>-?\d+)>/.exec(line)
  return {
    px: parseInt(regexResult.groups['px']),
    py: parseInt(regexResult.groups['py']),
    vx: parseInt(regexResult.groups['vx']),
    vy: parseInt(regexResult.groups['vy']),
  }
})

let minX, minY, maxX, maxY
do {
  minX = Infinity
  minY = Infinity
  maxX = -Infinity
  maxY = -Infinity
  for (const point of points) {
    point.px += point.vx
    point.py += point.vy

    if (minX > point.px) {
      minX = point.px
    }

    if (minY > point.py) {
      minY = point.py
    }

    if (maxX < point.px) {
      maxX = point.px
    }

    if (maxY < point.py) {
      maxY = point.py
    }
  }
} while (Math.abs(maxX - minX) > THRESHOLD || Math.abs(maxY - minY) > THRESHOLD)

let matrix = []
for (let y = minY; y <= maxY; y++) {
  matrix.push([])
  for (let x = minX; x <= maxX; x++) {
    matrix[y - minY].push('.')
  }
}

for (const point of points) {
  matrix[point.py - minY][point.px - minX] = '#'
}

print(matrix)
