import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const digits = readFile(FILE_NAME)[0]
  .split('')
  .map((char) => parseInt(char))

let result = 0
for (let i = 0; i < digits.length - 1; i++) {
  if (digits[i] === digits[i + 1]) {
    result += digits[i]
  }
}

if (digits[0] === digits[digits.length - 1]) {
  result += digits[0]
}

console.log(result)
