import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0]

let isUpdated = true
let str = input
while (isUpdated) {
  isUpdated = false
  let newStr = ''
  for (let i = 0; i < str.length; i++) {
    if (i < str.length - 1 && str[i] !== str[i + 1] && str[i].toLocaleLowerCase() === str[i + 1].toLocaleLowerCase()) {
      i += 1
      isUpdated = true
      continue
    }
    newStr += str[i]
  }

  str = newStr
}

const result = str.length

console.log(result)
