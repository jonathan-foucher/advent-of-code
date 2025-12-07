import { readFile } from '../../utils/file-utils.js'
import { md5 } from '../../utils/crypto-utils.js'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0]

let i = 0
while (!md5(input + i).startsWith('000000')) {
  i++
}

console.log(i)
