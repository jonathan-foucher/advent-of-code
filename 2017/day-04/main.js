import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const passphrases = readFile(FILE_NAME)

const isValid = (passphrase) => {
  const words = passphrase.split(/\s+/)
  const checkList = []

  for (const word of words) {
    if (checkList.includes(word)) {
      return false
    }
    checkList.push(word)
  }
  return true
}

let result = 0
for (const passphrase of passphrases) {
  if (isValid(passphrase)) {
    result++
  }
}

console.log(result)
