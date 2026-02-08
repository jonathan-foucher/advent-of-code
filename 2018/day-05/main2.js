import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0].split('')

const getReducedStr = (input) => {
  let isUpdated = true
  let str = [...input]
  while (isUpdated) {
    isUpdated = false
    let newStr = []
    for (let i = 0; i < str.length; i++) {
      if (
        i < str.length - 1
        && str[i] !== str[i + 1]
        && str[i].toLocaleLowerCase() === str[i + 1].toLocaleLowerCase()
      ) {
        i += 1
        isUpdated = true
        continue
      }
      newStr.push(str[i])
    }

    str = newStr
  }

  return str
}

let reducedStr = getReducedStr(input)

let result = Infinity
for (let i = 0; i < 26; i++) {
  const removedLowerChar = String.fromCharCode(97 + i)
  const removedUpperChar = String.fromCharCode(97 + i).toUpperCase()
  const newStr = reducedStr.filter((str) => str !== removedLowerChar && str !== removedUpperChar)

  const length = getReducedStr(newStr).length
  if (length < result) {
    result = length
  }
}

console.log(result)
