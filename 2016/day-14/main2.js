import { readFile } from '../../utils/javascript/file-utils'
import { md5 } from '../../utils/javascript/crypto-utils'

const FILE_NAME = 'input/input.txt'
const salt = readFile(FILE_NAME)[0]
const TARGET = 64
const HASHING_TIMES = 2016

const REGEX_THREE = /(.)\1\1/

const hashes = []
let counter = 0, i = -1

while (counter < TARGET) {
  i++
  let hash = hashes[i]
  if (!hash) {
    hash = md5(salt + i)
    for (let k = 0; k < HASHING_TIMES; k++) {
      hash = md5(hash)
    }
    hashes[i] = hash
  }

  const match = hash.match(REGEX_THREE)
  if (match) {
    const strFive = `${match[1]}${match[1]}${match[1]}${match[1]}${match[1]}`
    for (let j = i + 1; j <= i + 1000; j++) {
      let hash = hashes[j]
      if (!hash) {
        hash = md5(salt + j)
        for (let k = 0; k < HASHING_TIMES; k++) {
          hash = md5(hash)
        }
        hashes[j] = hash
      }
      if (hash.includes(strFive)) {
        counter++
        break
      }
    }
  }
}

console.log(i)
