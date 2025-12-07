import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const inputs = readFile(FILE_NAME)[0].split('')

let floor = 0
let i = 0
while (i < inputs.length && floor >= 0) {
  if (inputs[i] === '(') {
    floor++
  } else {
    floor--
  }
  i++
}

console.log(i)
