import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)
  .map(line => {
    return [...line.matchAll(/(?<= )\d+/g)].map(n => parseInt(n))
      .sort((a, b) => a - b)
  })

let result = 0
for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i]
  if ((input[0] + input[1]) > input[2]) {
    result++
  }
}

console.log(result)
