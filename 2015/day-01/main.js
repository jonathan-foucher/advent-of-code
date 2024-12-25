import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt' 

const inputs = readFile(FILE_NAME)[0].split('')

let result = 0
for (let i = 0; i < inputs.length; i++) {
  if (inputs[i] === '(') {
    result++
  } else {
    result--
  }
}

console.log(result)
