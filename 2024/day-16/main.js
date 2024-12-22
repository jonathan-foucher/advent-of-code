import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const matrix = readFile(FILE_NAME).map(line => line.split(''))
let xStart
let yStart
const map = []
for (let i = 0; i < matrix.length; i++) {
  map.push([])
  for (let j = 0; j < matrix[0].length; j++) {
    const char = matrix[i][j]

    if (char === 'S') {
      xStart = j
      yStart = i
    }

    map[i].push({
        value: char,
        isWall: char === '#',
        isEnd: char === 'E',
        y: i,
        x: j,
        key: `${j}-${i}`
      })
  }
}

const HEIGHT = map.length
const WIDTH = map[0].length

const bestCaseScores = new Map()

const updatePossibilities = (possibilities) => {
  const newPossibilities = []
  let isUpdatedResult = false
  for (let i = 0; i < possibilities.length; i++) {
    const possibility = possibilities[i]
    if (possibility.isFinished) {
      newPossibilities.push(possibility)
    } else {
      if (possibility.x > 0
        && !map[possibility.y][possibility.x - 1].isWall
        && !possibility.path.includes(map[possibility.y][possibility.x - 1].key)
      ) {
        const newCase = map[possibility.y][possibility.x - 1]
        const newScore = possibility.score + (possibility.direction !== '<' ? 1001 : 1)
        
        const bestScore = bestCaseScores.get(newCase.key)
        if (!bestScore || newScore < bestScore) {
          isUpdatedResult = true
          const newPossibility = {
            x: newCase.x,
            y: newCase.y,
            score: newScore,
            direction: '<',
            path: [...possibility.path, newCase.key],
            isFinished: newCase.isEnd
          }
          newPossibilities.push(newPossibility)
          bestCaseScores.set(newCase.key, newScore)
        }
      }

      if (possibility.y > 0
        && !map[possibility.y - 1][possibility.x].isWall
        && !possibility.path.includes(map[possibility.y - 1][possibility.x].key)
      ) {
        const newCase = map[possibility.y - 1][possibility.x]
        const newScore = possibility.score + (possibility.direction !== '^' ? 1001 : 1)
        
        const bestScore = bestCaseScores.get(newCase.key)
        if (!bestScore || newScore < bestScore) {
          isUpdatedResult = true
          const newPossibility = {
            x: newCase.x,
            y: newCase.y,
            score: newScore,
            direction: '^',
            path: [...possibility.path, newCase.key],
            isFinished: newCase.isEnd
          }
          newPossibilities.push(newPossibility)
          bestCaseScores.set(newCase.key, newScore)
        }
      }

      if (possibility.y < WIDTH - 1
        && !map[possibility.y + 1][possibility.x].isWall
        && !possibility.path.includes(map[possibility.y + 1][possibility.x].key)
      ) {
        const newCase = map[possibility.y + 1][possibility.x]
        const newScore = possibility.score + (possibility.direction !== 'v' ? 1001 : 1)
        
        const bestScore = bestCaseScores.get(newCase.key)
        if (!bestScore || newScore < bestScore) {
          isUpdatedResult = true
          const newPossibility = {
            x: newCase.x,
            y: newCase.y,
            score: newScore,
            direction: 'v',
            path: [...possibility.path, newCase.key],
            isFinished: newCase.isEnd
          }
          newPossibilities.push(newPossibility)
          bestCaseScores.set(newCase.key, newScore)
        }
      }

      if (possibility.x < HEIGHT - 1
        && !map[possibility.y][possibility.x + 1].isWall
        && !possibility.path.includes(map[possibility.y][possibility.x + 1].key)
      ) {
        const newCase = map[possibility.y][possibility.x + 1]
        const newScore = possibility.score + (possibility.direction !== '>' ? 1001 : 1)
        
        const bestScore = bestCaseScores.get(newCase.key)
        if (!bestScore || newScore < bestScore) {
          isUpdatedResult = true
          const newPossibility = {
            x: newCase.x,
            y: newCase.y,
            score: newScore,
            direction: '>',
            path: [...possibility.path, newCase.key],
            isFinished: newCase.isEnd
          }
          newPossibilities.push(newPossibility)
          bestCaseScores.set(newCase.key, newScore)
        }
      }
    }
  }
  return { newPossibilities, isUpdatedResult }
}

let possibilities = [{
  x: xStart,
  y: yStart,
  score: 0,
  direction: '>',
  path: [ `${xStart}-${yStart}` ],
  isFinished: false
}]
let isUpdated = false
do {
  const { newPossibilities, isUpdatedResult } = updatePossibilities(possibilities)
  possibilities = newPossibilities
  isUpdated = isUpdatedResult
} while (isUpdated)

const result = Math.min(
  ...possibilities.filter(possibility => possibility.isFinished)
    .map(possibility => possibility.score)
)

console.log(result)
