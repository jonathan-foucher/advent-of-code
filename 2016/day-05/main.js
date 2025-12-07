import { readFile } from '../../utils/file-utils.js'
import { md5 } from '../../utils/crypto-utils.js'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0]

const PASSWORD_LENGTH = 8
const REGEX_START_FIVE_0 = /^0{5}/

let result = ''
let i = 0
while (result.length < PASSWORD_LENGTH) {
  const hash = md5(input + i)
  if (hash.match(REGEX_START_FIVE_0)) {
    result += hash[5]
  }
  i++
}

console.log(result)
