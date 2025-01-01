import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const strArray = readFile(FILE_NAME)

let result = 0
for (let i = 0; i < strArray.length; i++) {
  result += strArray[i].length - strArray[i].replaceAll(/\\(x[0-9a-f]{2}|\\|\")/gi, '_').length + 2
}

console.log(result)
