import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)
  .map(line => {
    return [...line.matchAll(/(?<= )\d+/g)].map(n => parseInt(n))
  })

let result = 0
for (let i = 0; i < inputs.length; i += 3) {
  for (let j = 0; j < 3; j++) {
    const input = [inputs[i][j], inputs[i + 1][j], inputs[i + 2][j]].sort((a, b) => a - b)
    if ((input[0] + input[1]) > input[2]) {
      result++
    }
  }
}

console.log(result)
