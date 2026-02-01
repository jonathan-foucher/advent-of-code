import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const rows = readFile(FILE_NAME).map((line) => {
  return line.split(/\s+/).map((str) => parseInt(str))
})

const getHighestWholeDivisionResult = (numbers) => {
  numbers.sort((a, b) => b - a)

  for (let i = 0; i < numbers.length - 1; i++) {
    const n1 = numbers[i]
    for (let j = i + 1; j < numbers.length; j++) {
      const n2 = numbers[j]
      if (n1 % n2 === 0) {
        return n1 / n2
      }
    }
  }

  return 0
}

let result = 0
for (const numbers of rows) {
  result += getHighestWholeDivisionResult(numbers)
}

console.log(result)
