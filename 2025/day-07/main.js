import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const matrix = readFile(FILE_NAME).map((line) => line.replace('S', '|').split(''))

const HEIGHT = matrix.length
const WIDTH = matrix[0].length

let result = 0

for (let i = 0; i < HEIGHT - 1; i++) {
  for (let j = 0; j < WIDTH; j++) {
    if (matrix[i][j] === '|') {
      if (matrix[i + 1][j] === '.') {
        matrix[i + 1][j] = '|'
      } else if (matrix[i + 1][j] === '^') {
        result++
        if (j > 0) {
          matrix[i + 1][j - 1] = '|'
        }
        if (j < WIDTH) {
          matrix[i + 1][j + 1] = '|'
        }
      }
    }
  }
}

console.log(result)
