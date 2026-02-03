import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const characters = readFile(FILE_NAME)[0]
  .split('')
  .filter((char) => char !== ',')

let deltaY = 0
let deltaX = 0
for (const char of characters) {
  switch (char) {
    case 'n':
      deltaY++
      break
    case 's':
      deltaY--
      break
    case 'e':
      deltaX++
      break
    case 'w':
      deltaX--
      break
  }
}

const result = Math.abs(Math.abs(deltaY) - Math.abs(deltaX)) + Math.min(Math.abs(deltaY), Math.abs(deltaX))
console.log(result)
