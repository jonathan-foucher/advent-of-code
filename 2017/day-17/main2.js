import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_INSERTS = 50000000

const steps = parseInt(readFile(FILE_NAME)[0])

let cursor = 0
let result = undefined
for (let i = 1; i <= NUMBER_OF_INSERTS; i++) {
  cursor = (cursor + steps) % i
  if (cursor === 0) {
    result = i
  }
  cursor++
}

console.log(result)
