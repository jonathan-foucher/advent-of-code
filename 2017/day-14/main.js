import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'
const SIZE = 128

const key = readFile(FILE_NAME)[0]

let result = 0
for (let row = 0; row < SIZE; row++) {
  const hashInput = `${key}-${row}`
  const INITIAL_LIST_LENGTH = 256
  const NUMBER_OF_ROUNDS = 64
  const ADDITIONAL_SEQUENCE = [17, 31, 73, 47, 23]

  let inputs = hashInput.split('').map((char) => char.charCodeAt(0))

  inputs = inputs.concat(ADDITIONAL_SEQUENCE)

  let list = []
  for (let i = 0; i < INITIAL_LIST_LENGTH; i++) {
    list.push(i)
  }

  let nShift = 0
  let skipSize = 0
  for (let _ = 0; _ < NUMBER_OF_ROUNDS; _++) {
    for (const input of inputs) {
      list = [...list.slice(0, input).reverse(), ...list.slice(input)]

      for (let _ = 0; _ < input + skipSize; _++) {
        list.push(list.shift())
        nShift++
      }
      skipSize++
    }
  }

  for (let _ = 0; _ < nShift % INITIAL_LIST_LENGTH; _++) {
    list.unshift(list.pop())
  }

  let denseHash = []
  for (let i = 0; i < 16; i++) {
    let hash = list[16 * i]
    for (let j = 1; j < 16; j++) {
      hash = hash ^ list[16 * i + j]
    }
    denseHash.push(hash)
  }

  const hash = denseHash.map((n) => n.toString(16).padStart(2, '0'))
  const rowValue = hash.map((char) => parseInt(char, 16).toString(2).padStart(8, '0')).join('')
  result += rowValue.split('').filter((c) => c === '1').length
}

console.log(result)
