import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NB_TURNS = 50

let str = readFile(FILE_NAME)[0]

for (let i = 0; i < NB_TURNS; i++) {
  let result = ''
  let prevChar
  let count = 0

  for (let j = 0; j <= str.length; j++) {
    const currentChar = str[j]
    if (j > 0 && currentChar !== prevChar) {
      result += count + prevChar
      count = 0
    }
    prevChar = currentChar
    count++
  }

  str = result
}

console.log(str.length)
