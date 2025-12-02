import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

let result = 0

const ranges = readFile(FILE_NAME).flatMap(line => line.split(','))

for (let i = 0; i < ranges.length; i++) {
  const firstNumber = parseInt(ranges[i].split('-')[0])
  const lastNumber = parseInt(ranges[i].split('-')[1])

  for (let j = firstNumber; j <= lastNumber; j++) {
    const str = j + ''
    for (let k = 1; k <= str.length / 2; k++) {
      const subStr = str.slice(0, k)
      const regex = new RegExp(`^(${subStr}){2,}$`)
      if (regex.test(str)) {
        result += j
        break
      }
    }
  }
}

console.log(result)
