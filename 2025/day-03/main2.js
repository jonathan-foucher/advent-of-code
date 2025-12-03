import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const NUMBER_OF_BATTERIES = 12
let result = 0

const getMax = (bank, str, idx) => {
  if (str.length === NUMBER_OF_BATTERIES) {
    return parseInt(str)
  }

  const currentArray = bank.slice(idx, bank.length - NUMBER_OF_BATTERIES + str.length + 1)

  let max = currentArray[0]
  let maxIdx = 0
  for (let i = 1; i < currentArray.length; i++) {
    if (max < currentArray[i]) {
      max = currentArray[i]
      maxIdx = i
    }
  }

  return getMax(bank, str + max, idx + maxIdx + 1)
}

readFile(FILE_NAME).map(bank => bank.split('').map(char => parseInt(char)))
  .forEach(bank => result += getMax(bank, '', 0))

console.log(result)
