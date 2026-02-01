import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const passphrases = readFile(FILE_NAME)

const isValid = (passphrase) => {
  const words = passphrase.split(/\s+/)
  const checkList = []

  for (const word of words) {
    const sortedWord = word.split('').sort().join('')
    if (checkList.includes(sortedWord)) {
      return false
    }
    checkList.push(sortedWord)
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
