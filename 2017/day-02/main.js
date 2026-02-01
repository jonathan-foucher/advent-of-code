import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const rows = readFile(FILE_NAME).map((line) => {
  return line.split(/\s+/).map((str) => parseInt(str))
})

let result = 0
for (const numbers of rows) {
  result += Math.max(...numbers) - Math.min(...numbers)
}

console.log(result)
