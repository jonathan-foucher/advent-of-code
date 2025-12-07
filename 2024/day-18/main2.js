import { readFile } from '../../utils/file-utils.js'

const isExample = false
const FILE_NAME = isExample ? 'input/example.txt' : 'input/input.txt'
const SIZE = isExample ? 6 : 70

const bytes = readFile(FILE_NAME)

const map = []
for (let i = 0; i <= SIZE; i++) {
  map.push([])
  for (let j = 0; j <= SIZE; j++) {
    map[i].push({
      isWall: false,
      y: i,
      x: j,
      key: `${i}-${j}`,
      isEnd: j === SIZE && i === SIZE,
    })
  }
}

const updatePossibilities = (possibilities, bestCaseScores) => {
  const newPossibilities = []
  let isUpdatedResult = false
  for (let i = 0; i < possibilities.length; i++) {
    const possibility = possibilities[i]
    if (possibility.isFinished) {
      newPossibilities.push(possibility)
    } else {
      if (
        possibility.x > 0
        && !map[possibility.y][possibility.x - 1].isWall
        && !possibility.path.includes(map[possibility.y][possibility.x - 1].key)
      ) {
        const newCase = map[possibility.y][possibility.x - 1]
        const newScore = possibility.score + 1

        const bestScore = bestCaseScores.get(newCase.key)
        if (!bestScore || newScore < bestScore) {
          isUpdatedResult = true
          const newPossibility = {
            x: newCase.x,
            y: newCase.y,
            score: newScore,
            path: [...possibility.path, newCase.key],
            isFinished: newCase.isEnd,
          }
          newPossibilities.push(newPossibility)
          bestCaseScores.set(newCase.key, newScore)
        }
      }

      if (
        possibility.y > 0
        && !map[possibility.y - 1][possibility.x].isWall
        && !possibility.path.includes(map[possibility.y - 1][possibility.x].key)
      ) {
        const newCase = map[possibility.y - 1][possibility.x]
        const newScore = possibility.score + 1

        const bestScore = bestCaseScores.get(newCase.key)
        if (!bestScore || newScore < bestScore) {
          isUpdatedResult = true
          const newPossibility = {
            x: newCase.x,
            y: newCase.y,
            score: newScore,
            path: [...possibility.path, newCase.key],
            isFinished: newCase.isEnd,
          }
          newPossibilities.push(newPossibility)
          bestCaseScores.set(newCase.key, newScore)
        }
      }

      if (
        possibility.y < SIZE
        && !map[possibility.y + 1][possibility.x].isWall
        && !possibility.path.includes(map[possibility.y + 1][possibility.x].key)
      ) {
        const newCase = map[possibility.y + 1][possibility.x]
        const newScore = possibility.score + 1

        const bestScore = bestCaseScores.get(newCase.key)
        if (!bestScore || newScore < bestScore) {
          isUpdatedResult = true

          const newPossibility = {
            x: newCase.x,
            y: newCase.y,
            score: newScore,
            path: [...possibility.path, newCase.key],
            isFinished: newCase.isEnd,
          }
          newPossibilities.push(newPossibility)
          bestCaseScores.set(newCase.key, newScore)
        }
      }

      if (
        possibility.x < SIZE
        && !map[possibility.y][possibility.x + 1].isWall
        && !possibility.path.includes(map[possibility.y][possibility.x + 1].key)
      ) {
        const newCase = map[possibility.y][possibility.x + 1]
        const newScore = possibility.score + 1

        const bestScore = bestCaseScores.get(newCase.key)
        if (!bestScore || newScore < bestScore) {
          isUpdatedResult = true
          const newPossibility = {
            x: newCase.x,
            y: newCase.y,
            score: newScore,
            path: [...possibility.path, newCase.key],
            isFinished: newCase.isEnd,
          }
          newPossibilities.push(newPossibility)
          bestCaseScores.set(newCase.key, newScore)
        }
      }
    }
  }
  return { newPossibilities, isUpdatedResult }
}

let nBytes = 0
let isPossible = true
while (isPossible) {
  const n = bytes[nBytes].split(',')
  map[parseInt(n[1])][parseInt(n[0])].isWall = true

  const bestCaseScores = new Map()
  let xStart = 0
  let yStart = 0

  let possibilities = [
    {
      x: xStart,
      y: yStart,
      score: 0,
      path: [`${xStart}-${yStart}`],
      isFinished: false,
    },
  ]
  let isUpdated = false
  do {
    const { newPossibilities, isUpdatedResult } = updatePossibilities(possibilities, bestCaseScores)
    possibilities = newPossibilities
    isUpdated = isUpdatedResult
  } while (isUpdated)

  if (possibilities.length > 0) {
    nBytes++
  } else {
    isPossible = false
  }
}

console.log(bytes[nBytes])
