import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const INITIAL_LIST_LENGTH = IS_EXAMPLE ? 5 : 256

const inputs = readFile(FILE_NAME)[0]
  .split(',')
  .map((char) => parseInt(char))

let list = []
for (let i = 0; i < INITIAL_LIST_LENGTH; i++) {
  list.push(i)
}

let nShift = 0
let skipSize = 0
for (const input of inputs) {
  list = [...list.slice(0, input).reverse(), ...list.slice(input)]

  for (let _ = 0; _ < input + skipSize; _++) {
    list.push(list.shift())
    nShift++
  }
  skipSize++
}

for (let _ = 0; _ < nShift % INITIAL_LIST_LENGTH; _++) {
  list.unshift(list.pop())
}

const result = list[0] * list[1]
console.log(result)
