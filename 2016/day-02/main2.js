import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)

const NUM_PAD = [
  { value: '1', x: 2, y: 0 },
  { value: '2', x: 1, y: 1 },
  { value: '3', x: 2, y: 1 },
  { value: '4', x: 3, y: 1 },
  { value: '5', x: 0, y: 2 },
  { value: '6', x: 1, y: 2 },
  { value: '7', x: 2, y: 2 },
  { value: '8', x: 3, y: 2 },
  { value: '9', x: 4, y: 2 },
  { value: 'A', x: 1, y: 3 },
  { value: 'B', x: 2, y: 3 },
  { value: 'C', x: 3, y: 3 },
  { value: 'D', x: 2, y: 4 },
]
let x = 0
let y = 2
let result = ''

for (let i = 0; i < inputs.length; i++) {
  for (let j = 0; j < inputs[i].length; j++) {
    const input = inputs[i][j]
    if (input === 'U' && NUM_PAD.find((key) => key.x === x && key.y === y - 1)) {
      y--
    }
    if (input === 'L' && NUM_PAD.find((key) => key.x === x - 1 && key.y === y)) {
      x--
    }
    if (input === 'D' && NUM_PAD.find((key) => key.x === x && key.y === y + 1)) {
      y++
    }
    if (input === 'R' && NUM_PAD.find((key) => key.x === x + 1 && key.y === y)) {
      x++
    }
  }
  result += NUM_PAD.find((key) => key.x === x && key.y === y).value
}

console.log(result)
