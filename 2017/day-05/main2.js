import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const trampolines = readFile(FILE_NAME).map((line) => {
  return parseInt(line)
})

let currentPosition = 0
let result = 0

while (currentPosition < trampolines.length) {
  const newPosition = currentPosition + trampolines[currentPosition]
  if (trampolines[currentPosition] >= 3) {
    trampolines[currentPosition]--
  } else {
    trampolines[currentPosition]++
  }
  currentPosition = newPosition
  result++
}

console.log(result)
