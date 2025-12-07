import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const directions = readFile(FILE_NAME)[0].split('')

let x1 = 0
let y1 = 0
let x2 = 0
let y2 = 0
const visitedLocations = ['0-0']

for (let i = 0; i < directions.length; i++) {
  const direction = directions[i]
  switch (direction) {
    case '>':
      if (i % 2 === 0) {
        x1++
      } else {
        x2++
      }
      break
    case '<':
      if (i % 2 === 0) {
        x1--
      } else {
        x2--
      }
      break
    case '^':
      if (i % 2 === 0) {
        y1--
      } else {
        y2--
      }
      break
    case 'v':
      if (i % 2 === 0) {
        y1++
      } else {
        y2++
      }
      break
  }

  const key = i % 2 === 0 ? `${x1}-${y1}` : `${x2}-${y2}`
  if (!visitedLocations.includes(key)) {
    visitedLocations.push(key)
  }
}

console.log(visitedLocations.length)
