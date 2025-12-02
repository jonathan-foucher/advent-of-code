import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

let result = 0

const ranges = readFile(FILE_NAME).flatMap(line => line.split(','))

for (let i = 0; i < ranges.length; i++) {
  const firstNumber = parseInt(ranges[i].split('-')[0])
  const lastNumber = parseInt(ranges[i].split('-')[1])
  
  for (let j = firstNumber; j <= lastNumber; j++) {
    const str = j + ''
    if (str.length % 2 === 0 && str.slice(0, str.length / 2) === str.slice(str.length / 2, str.length)) {
      result += j
    }
  }
}

console.log(result)
