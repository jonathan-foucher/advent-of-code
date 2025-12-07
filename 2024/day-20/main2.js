import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const PICOSECONDS_THRESHOLD = IS_EXAMPLE ? 50 : 100
const CHEAT_TIME = 20

const matrix = readFile(FILE_NAME).map((line) => line.split(''))
let xStart
let yStart
let xEnd
let yEnd
const map = []
for (let i = 0; i < matrix.length; i++) {
  map.push([])
  for (let j = 0; j < matrix[0].length; j++) {
    const char = matrix[i][j]

    if (char === 'S') {
      xStart = j
      yStart = i
    }
    if (char === 'E') {
      xEnd = j
      yEnd = i
    }

    map[i].push({
      value: char,
      isWall: char === '#',
      y: i,
      x: j,
      key: `${j}-${i}`,
    })
  }
}

const HEIGHT = map.length
const WIDTH = map[0].length

const caseScores = new Map()

const calculateCasesScores = (x, y, score, path) => {
  const key = `${x}-${y}`
  path.push(key)
  caseScores.set(key, score)

  if (x === xEnd && y === yEnd) {
    return 1
  }

  if (x > 0 && !map[y][x - 1].isWall && !path.includes(map[y][x - 1].key)) {
    return calculateCasesScores(x - 1, y, score + 1, path)
  }

  if (x < HEIGHT - 1 && !map[y][x + 1].isWall && !path.includes(map[y][x + 1].key)) {
    return calculateCasesScores(x + 1, y, score + 1, path)
  }

  if (y > 0 && !map[y - 1][x].isWall && !path.includes(map[y - 1][x].key)) {
    return calculateCasesScores(x, y - 1, score + 1, path)
  }

  if (y < WIDTH - 1 && !map[y + 1][x].isWall && !path.includes(map[y + 1][x].key)) {
    return calculateCasesScores(x, y + 1, score + 1, path)
  }
}

calculateCasesScores(xStart, yStart, 0, [])

let result = 0

for (let i = 0; i < HEIGHT; i++) {
  for (let j = 0; j < WIDTH; j++) {
    const currentCase = map[i][j]
    if (!currentCase.isWall) {
      for (let k = 0; k < HEIGHT; k++) {
        for (let l = 0; l < WIDTH; l++) {
          if (k !== i || j !== l) {
            const otherCase = map[k][l]
            const delta = Math.abs(i - k) + Math.abs(j - l)
            if (!otherCase.isWall && delta <= CHEAT_TIME) {
              const currentScore = caseScores.get(currentCase.key)
              const otherScore = caseScores.get(otherCase.key)
              if (otherScore - currentScore - delta >= PICOSECONDS_THRESHOLD) {
                result++
              }
            }
          }
        }
      }
    }
  }
}

console.log(result)
