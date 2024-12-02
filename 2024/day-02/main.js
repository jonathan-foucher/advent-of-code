import { readFile } from './file-utils'

const FILE_NAME = 'input/input.txt'

const isSafe = (array) => {
    return array.every((val, i) => i === array.length - 1 || val - array[i + 1] <= 3 && val - array[i + 1] >= 1)
      || array.every((val, i) => i === array.length - 1 || val - array[i + 1] <= -1 && val - array[i + 1] >= -3)
}

const result = readFile(FILE_NAME)
  .map(line => line.split(' ').map(str => parseInt(str)))
  .filter(report => isSafe(report))
  .length

console.log(result)
