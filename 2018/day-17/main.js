import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const SPING_X = 500
const SPRING_Y = 0

const clays = readFile(FILE_NAME).map((line) => {
  const regexResult =
    /x=(?<x>\d+), y=(?<minY>\d+)\.\.(?<maxY>\d+)/.exec(line) ?? /y=(?<y>\d+), x=(?<minX>\d+)\.\.(?<maxX>\d+)/.exec(line)
  return {
    minX: parseInt(regexResult.groups['x'] ?? regexResult.groups['minX']),
    maxX: parseInt(regexResult.groups['x'] ?? regexResult.groups['maxX']),
    minY: parseInt(regexResult.groups['y'] ?? regexResult.groups['minY']),
    maxY: parseInt(regexResult.groups['y'] ?? regexResult.groups['maxY']),
  }
})

const MIN_X = Math.min(...clays.map((clay) => clay.minX))
const MAX_X = Math.max(...clays.map((clay) => clay.maxX)) + 1
const MIN_Y = Math.min(...clays.map((clay) => clay.minY))
const MAX_Y = Math.max(...clays.map((clay) => clay.maxY)) + 1

const MAP = []
for (let y = 0; y < MAX_Y; y++) {
  MAP.push([])
  for (let x = 0; x < MAX_X; x++) {
    MAP[y].push({
      x,
      y,
      isClay: false,
      isWater: false,
      isBlocked: false,
    })
  }
}

for (const clay of clays) {
  for (let y = clay.minY; y <= clay.maxY; y++) {
    for (let x = clay.minX; x <= clay.maxX; x++) {
      MAP[y][x].isClay = true
      MAP[y][x].isBlocked = true
    }
  }
}

const printMap = () => {
  for (let y = 0; y < MAX_Y; y++) {
    let line = ''
    for (let x = MIN_X; x < MAX_X; x++) {
      line += MAP[y][x].isClay ? '#' : MAP[y][x].isBlocked ? '~' : MAP[y][x].isWater ? '|' : '.'
    }
    console.log(line)
  }
  console.log()
}

const propagateWater = (x, y) => {
  MAP[y][x].isWater = true
  if (y + 1 >= MAX_Y) {
    return false
  }

  if (!MAP[y + 1][x].isBlocked && !MAP[y + 1][x].isWater) {
    propagateWater(x, y + 1)
  }

  if (MAP[y + 1][x].isBlocked) {
    let i = 0
    while (x + i < MAX_X - 1 && MAP[y + 1][x + i + 1].isBlocked && !MAP[y][x + i + 1].isBlocked) {
      i++
      MAP[y][x + i].isWater = true
    }
    const isRightBlocked = MAP[y][x + i + 1].isClay

    let j = 0
    while (x - j > 1 && MAP[y + 1][x - j - 1].isBlocked && !MAP[y][x - j - 1].isBlocked) {
      j++
      MAP[y][x - j].isWater = true
    }
    const isLeftBlocked = MAP[y][x - j - 1].isClay

    if (isRightBlocked && isLeftBlocked) {
      for (let k = x - j; k <= x + i; k++) {
        MAP[y][k].isBlocked = true
      }
    }

    if (!isLeftBlocked && !MAP[y][x - j - 1].isWater) {
      propagateWater(x - j - 1, y)
    }
    if (!isRightBlocked && !MAP[y][x + i + 1].isWater) {
      propagateWater(x + i + 1, y)
    }
  }
}

propagateWater(SPING_X, SPRING_Y)

let result = 0
for (let y = MIN_Y; y < MAX_Y; y++) {
  for (let x = 0; x < MAX_X; x++) {
    if (MAP[y][x].isWater) {
      result++
    }
  }
}

printMap()
console.log(result)
