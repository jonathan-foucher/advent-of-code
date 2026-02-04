import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_INSERTS = 2017

const steps = parseInt(readFile(FILE_NAME)[0])

const buffer = [0]
let cursor = 0

for (let i = 1; i <= NUMBER_OF_INSERTS; i++) {
  cursor = (cursor + steps) % buffer.length
  buffer.splice(cursor + 1, 0, i)
  cursor++
}

cursor = 0
while (buffer[cursor] !== NUMBER_OF_INSERTS) {
  cursor++
}
cursor = (cursor + 1) % buffer.length

console.log(buffer[cursor])
