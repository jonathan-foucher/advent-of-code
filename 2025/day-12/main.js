import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let lines = readFile(FILE_NAME)
const presents = []
const presentSizes = []
const regions = []

let a = 0
let presentId = 0
while (!lines[a].includes('x')) {
  presents.push([])
  a++
  while (lines[a] !== '') {
    presents[presentId].push(lines[a].split('').map((c) => c === '#'))
    a++
  }
  a++
  presentId++
}

for (let i = 0; i < presents.length; i++) {
  presentSizes[i] = presents[i].flatMap((b) => b).reduce((acc, val) => acc + (val ? 1 : 0), 0)
}

while (a < lines.length) {
  const REGEX = /^(\d+)x(\d+): ((?:\d *)+)$/g
  const regexResult = REGEX.exec(lines[a])
  const x = parseInt(regexResult[1])
  const y = parseInt(regexResult[2])
  const quantities = regexResult[3].split(' ').map((n) => parseInt(n))
  regions.push({ x, y, quantities })
  a++
}

/* counting required size and comparing it to the available space seems to be enough to resolve the input
const isSameShape = (a, b) => {
  const size = a.length
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (a[i][j] !== b[i][j]) {
        return false
      }
    }
  }
  return true
}

const isExistingShape = (newShape, shapes) => {
  for (let i = 0; i < shapes.length; i++) {
    if (isSameShape(newShape, shapes[i])) {
      return true
    }
  }
  return false
}

const rotateShape = (shape) => {
  const size = shape.length
  const newShape = []
  for (let i = 0; i < size; i++) {
    newShape.push([])
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      newShape[size - i - 1].push(shape[j][i])
    }
  }
  return newShape
}

const reverseShape = (shape) => {
  const newShape = []
  for (let i = 0; i < shape.length; i++) {
    newShape.push(shape[i].toReversed())
  }
  return newShape
}

for (let i = 0; i < presents.length; i++) {
  const shape = [...presents[i]]
  presents[i] = []
  presents[i].push(shape)
  let lastRotated = shape
  for (let j = 0; j < 3; j++) {
    const newShape = rotateShape(lastRotated)
    lastRotated = newShape
    if (!isExistingShape(newShape, presents[i])) {
      presents[i].push(newShape)
    }
  }

  const length = presents[i].length
  for (let j = 0; j < length; j++) {
    const newShape = reverseShape(presents[i][j])
    if (!isExistingShape(newShape, presents[i])) {
      presents[i].push(newShape)
    }
  }
}*/

let result = 0
for (const region of regions) {
  let requiredSize = 0
  for (let i = 0; i < presentSizes.length; i++) {
    requiredSize += region.quantities[i] * presentSizes[i]
  }

  if (requiredSize > region.x * region.y) {
    continue
  }
  result++
}

console.log(result)
