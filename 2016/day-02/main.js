import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)

const PAD_SIZE = 3
const NUM_PAD = [
  { value: '1', x: 0, y: 0 },
  { value: '2', x: 1, y: 0 },
  { value: '3', x: 2, y: 0 },
  { value: '4', x: 0, y: 1 },
  { value: '5', x: 1, y: 1 },
  { value: '6', x: 2, y: 1 },
  { value: '7', x: 0, y: 2 },
  { value: '8', x: 1, y: 2 },
  { value: '9', x: 2, y: 2 },
]
let x = 1
let y = 1
let result = ''

for (let i = 0; i < inputs.length; i++) {
  for (let j = 0; j < inputs[i].length; j++) {
    const input = inputs[i][j]
    if (input === 'U' && y > 0) {
      y--
    }
    if (input === 'L' && x > 0) {
      x--
    }
    if (input === 'D' && y < PAD_SIZE - 1) {
      y++
    }
    if (input === 'R' && x < PAD_SIZE - 1) {
      x++
    }
  }
  result += NUM_PAD.find((key) => key.x === x && key.y === y).value
}

console.log(result)
