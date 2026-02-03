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

const cleanStream = []
for (let i = 0; i < streamWithoutCancel.length; i++) {
  let char = streamWithoutCancel[i]
  if (char === '<') {
    while (char !== '>') {
      i++
      char = streamWithoutCancel[i]
    }

    continue
  }

  if (char === '{' || char === '}') {
    cleanStream.push(char)
  }
}

let result = 0
let coefficient = 0
for (const char of cleanStream) {
  if (char === '{') {
    coefficient++
  } else {
    result += coefficient
    coefficient--
  }
}

console.log(result)
