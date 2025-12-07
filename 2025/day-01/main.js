import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

let dial = 50
let result = 0

readFile(FILE_NAME).forEach((line) => {
  const dir = line[0] === 'R' ? 1 : -1
  const value = parseInt(line.slice(1, line.length))

  dial = (dial + dir * value) % 100

  if (dial === 0) {
    result++
  }
})

console.log(result)
