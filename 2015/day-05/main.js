import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)

const voyels = [ 'a', 'e', 'i', 'o', 'u' ]
const forbiddenStrings = [ 'ab', 'cd', 'pq', 'xy' ]

let result = 0

for (let i = 0; i < inputs.length; i++) {
  const str = inputs[i]
  let voyelsCount = 0
  let hasDoubleChar = false
  let previousChar

  for (let j = 0; j < str.length; j++) {
    const char = str[j]
    if (voyels.includes(char)) {
      voyelsCount++
    }
    if (char === previousChar) {
      hasDoubleChar = true
    }
    previousChar = char
  }

  if (voyelsCount >= 3
    && hasDoubleChar
    && forbiddenStrings.every(forbiddenString => !str.includes(forbiddenString))
  ) {
      result++
  }
}

console.log(result)
