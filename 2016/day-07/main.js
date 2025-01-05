import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)
const REGEX_ABBA = /(.)(?!\1)(.)\2\1/
const REGEX_ABBA_BRACKETS = /\[?(.)(?!\1)(.)\2\1[a-z]*\]/

let result = 0
for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i]
  if (REGEX_ABBA.test(input) && !REGEX_ABBA_BRACKETS.test(input)) {
    result++
  }
}

console.log(result)
