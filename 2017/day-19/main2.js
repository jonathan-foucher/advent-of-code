import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const map = readFile(FILE_NAME).map((line) => {
  return line.split('').map((char) => {
    return {
      isTurn: char === '+',
      isPipe: char !== ' ',
    }
  })
})

const DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
]

let y = 0
let x = 0
while (!map[0][x].isPipe) {
  x++
}

let result = 0
let dirIdx = 0
while (true) {
  if (map[y][x].isTurn) {
    for (let i = 1; i < DIRECTIONS.length; i++) {
      const newDirIdx = (dirIdx + i) % DIRECTIONS.length
      if (
        DIRECTIONS[newDirIdx][0] + DIRECTIONS[dirIdx][0] === 0
        && DIRECTIONS[newDirIdx][1] + DIRECTIONS[dirIdx][1] === 0
      ) {
        continue
      }

      const newY = y + DIRECTIONS[newDirIdx][0]
      const newX = x + DIRECTIONS[newDirIdx][1]
      if (map[newY] && map[newY][newX]?.isPipe) {
        dirIdx = newDirIdx
        break
      }
    }
  }

  y += DIRECTIONS[dirIdx][0]
  x += DIRECTIONS[dirIdx][1]
  result++
  if (!map[y] || !map[y][x]?.isPipe) {
    break
  }
}

console.log(result)
