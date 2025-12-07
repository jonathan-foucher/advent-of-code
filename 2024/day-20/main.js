import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const PICOSECONDS_THRESHOLD = IS_EXAMPLE ? 38 : 100

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
let maxScore
const calculateCasesScores = (x, y, score, path) => {
  const key = `${x}-${y}`
  path.push(key)
  caseScores.set(key, score)

  if (x === xEnd && y === yEnd) {
    maxScore = score
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

const countCheatsBetterTargetScore = (x, y, score, path, target, isCheatAvailable) => {
  const key = `${x}-${y}`

  path.push(key)
  const bestScore = caseScores.get(key)
  if ((x === xEnd && y === yEnd) || score + PICOSECONDS_THRESHOLD <= bestScore) {
    return 1
  }

  if (
    Math.abs(xEnd - x) + Math.abs(yEnd - y) + score > target
    || (bestScore && score + (isCheatAvailable ? 0 : PICOSECONDS_THRESHOLD) > bestScore)
  ) {
    return 0
  }

  let sum = 0
  if (x > 0 && (!map[y][x - 1].isWall || isCheatAvailable) && !path.includes(`${x - 1}-${y}`)) {
    sum += countCheatsBetterTargetScore(
      x - 1,
      y,
      score + 1,
      [...path],
      target,
      isCheatAvailable && !map[y][x - 1].isWall
    )
  }

  if (x < HEIGHT - 1 && (!map[y][x + 1].isWall || isCheatAvailable) && !path.includes(`${x + 1}-${y}`)) {
    sum += countCheatsBetterTargetScore(
      x + 1,
      y,
      score + 1,
      [...path],
      target,
      isCheatAvailable && !map[y][x + 1].isWall
    )
  }

  if (y > 0 && (!map[y - 1][x].isWall || isCheatAvailable) && !path.includes(`${x}-${y - 1}`)) {
    sum += countCheatsBetterTargetScore(
      x,
      y - 1,
      score + 1,
      [...path],
      target,
      isCheatAvailable && !map[y - 1][x].isWall
    )
  }

  if (y < WIDTH - 1 && (!map[y + 1][x].isWall || isCheatAvailable) && !path.includes(`${x}-${y + 1}`)) {
    sum += countCheatsBetterTargetScore(
      x,
      y + 1,
      score + 1,
      [...path],
      target,
      isCheatAvailable && !map[y + 1][x].isWall
    )
  }

  return sum
}

const result = countCheatsBetterTargetScore(xStart, yStart, 0, [], maxScore - PICOSECONDS_THRESHOLD, true)
console.log(result)
