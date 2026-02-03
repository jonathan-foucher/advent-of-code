import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const stream = readFile(FILE_NAME)[0].split('')

const streamWithoutCancel = []
for (let i = 0; i < stream.length; i++) {
  const char = stream[i]
  if (char === '!') {
    i++
    continue
  }

  streamWithoutCancel.push(char)
}

let result = 0
for (let i = 0; i < streamWithoutCancel.length; i++) {
  let char = streamWithoutCancel[i]
  if (char === '<') {
    i++
    char = streamWithoutCancel[i]

    while (char !== '>') {
      result++
      i++
      char = streamWithoutCancel[i]
    }

    continue
  }
}

console.log(result)
