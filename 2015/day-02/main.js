import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const dimensions = readFile(FILE_NAME).map((line) =>
  line
    .split('x')
    .map((value) => parseInt(value))
    .sort((a, b) => {
      return a - b
    })
)

let result = 0

for (let i = 0; i < dimensions.length; i++) {
  const dimension = dimensions[i]
  for (let j = 0; j < dimension.length - 1; j++) {
    for (let k = 1; k < dimension.length; k++)
      if (k !== j) {
        result += 2 * dimension[j] * dimension[k]
      }
  }
  result += dimension[0] * dimension[1]
}

console.log(result)
