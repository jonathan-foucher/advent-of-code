import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

let result = 0

readFile(FILE_NAME).forEach(bank => {
  const size = bank.length
  let max = 0

  for (let i = 0; i < size - 1; i++) {
    for (let j = i + 1; j < size; j++) {
      const value = parseInt(bank[i] + bank[j])
      if (value > max) {
        max = value
      }
    }
  }

  result += max
})

console.log(result)
