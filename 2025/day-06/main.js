import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const lines = readFile(FILE_NAME).map(line => line.split(' ').filter(a => a))

let result = 0

for (let i = 0; i < lines[0].length; i++) {
  let isAddition = lines[lines.length - 1][i] === '+'
  let columnResult = parseInt(lines[0][i])

  for (let j = 1; j < lines.length - 1; j++) {
    if (isAddition) {
      columnResult += parseInt(lines[j][i])
    } else {
      columnResult *= parseInt(lines[j][i])
    }
  }
  result += columnResult
}

console.log(result)
