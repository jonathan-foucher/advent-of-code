import { readFile } from '../../utils/javascript/file-utils'
import { md5 } from '../../utils/javascript/crypto-utils'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0]

let i = 0
while (!md5(input + i).startsWith('000000')) {
  i++
}

console.log(i)
