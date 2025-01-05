import { readFile } from '../../utils/javascript/file-utils'
import { md5 } from '../../utils/javascript/crypto-utils'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0]

const PASSWORD_LENGTH = 8
const REGEX_START_FIVE_0 = /^0{5}/

let result = []
let i = 0
while (result.length < PASSWORD_LENGTH) {
  const hash = md5(input + i)
  if (hash.match(REGEX_START_FIVE_0)) {
    const position = parseInt(hash[5])
    if (!isNaN(position)
      && position < PASSWORD_LENGTH
      && !result.find(char => char.position === position)
    ) {
      result.push({ position, value: hash[6] })
    }
  }
  i++
}

result = result.sort((a, b) => a.position - b.position)
  .map(char => char.value)
  .join('')

console.log(result)
