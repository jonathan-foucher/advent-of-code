import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const data = readFile(FILE_NAME)[0].split('')
  .map(char => parseInt(char))
const DISK_LENGTH = 272

let length = data.length
do {
  data.push(0)
  for (let i = length - 1; i >= 0; i--) {
    data.push(1 - data[i])
  }
  length = data.length
} while (length < DISK_LENGTH)

let checksum = data.slice(0, DISK_LENGTH)
while (checksum.length % 2 === 0) {
  let temp = []
  for (let i = 0; i < checksum.length; i += 2) {
    temp.push(1 - Math.abs(checksum[i] - checksum[i + 1]))
  }
  checksum = temp
}

console.log(checksum.join(''))
