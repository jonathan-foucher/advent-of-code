import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt' 

const directions = readFile(FILE_NAME)[0].split('')

let x = 0
let y = 0
const visitedLocations = [ '0-0' ]

for (let i = 0; i < directions.length; i++) {
  const direction = directions[i]
  switch (direction) {
    case '>':
      x++
      break
    case '<':
      x--
      break
    case '^':
      y--
      break
    case 'v':
      y++
      break
  }
  
  const key = `${x}-${y}`
  if (!visitedLocations.includes(key)) {
    visitedLocations.push(key)
  }
}

console.log(visitedLocations.length)
