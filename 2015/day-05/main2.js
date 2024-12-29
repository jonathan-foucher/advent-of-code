import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt' 

const inputs = readFile(FILE_NAME)

let result = 0

for (let i = 0; i < inputs.length; i++) {
  const str = inputs[i]
  let hasRepeatPair = false
  let hasRepeatChar = false
  
  for (let j = 0; j < str.length; j++) {
    hasRepeatPair = hasRepeatPair
      || (j + 1 < str.length && str.slice(j + 2, str.length).includes(str.slice(j, j + 2)))
    hasRepeatChar = hasRepeatChar
      || (j + 2 < str.length && str[j] === str[j + 2])
  }
  
  if (hasRepeatPair && hasRepeatChar) {
      result++
  }
}

console.log(result)
