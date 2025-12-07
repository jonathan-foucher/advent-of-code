import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const input = readFile(FILE_NAME)[0]

const getSum = (obj) => {
  if (Array.isArray(obj)) {
    return obj
      .map((value) => getSum(value))
      .filter((element) => Number.isInteger(element))
      .reduce((acc, val) => acc + val, 0)
  }

  if (Object.values(obj).includes('red')) {
    return 0
  }

  if (Number.isInteger(obj)) {
    return obj
  }

  if (typeof obj === 'string') {
    return 0
  }

  return Object.values(obj)
    .map((value) => getSum(value))
    .reduce((acc, val) => acc + val, 0)
}

const result = getSum(JSON.parse(input))
console.log(result)
