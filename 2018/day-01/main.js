import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const offsets = readFile(FILE_NAME).map((line) => parseInt(line))

let result = 0
for (const offset of offsets) {
  result += offset
}

console.log(result)
