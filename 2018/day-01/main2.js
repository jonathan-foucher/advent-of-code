import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const offsets = readFile(FILE_NAME).map((line) => parseInt(line))

let frequencies = []
let result = 0
mainloop: while (true) {
  for (const offset of offsets) {
    if (frequencies.includes(result)) {
      break mainloop
    }
    frequencies.push(result)
    result += offset
  }
}

console.log(result)
