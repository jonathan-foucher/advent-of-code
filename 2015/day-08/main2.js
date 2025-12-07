import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const strArray = readFile(FILE_NAME)

let result = 0
for (let i = 0; i < strArray.length; i++) {
  result += strArray[i].replaceAll(/\\x[0-9a-f]{2}|\\|"/gi, '\\$&').length + 2 - strArray[i].length
}

console.log(result)
