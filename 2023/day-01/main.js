import { readFile } from '../../utils/file-utils.js'

const getFirstDigit = (str, isReversed = false) => {
  let res = isReversed ? str.split('').reverse().join('') : str
  return res.split('').find((char) => !isNaN(char))
}

const result = readFile('input/input.txt')
  .map((line) => getFirstDigit(line) + getFirstDigit(line, true))
  .filter((line) => line)
  .map((line) => parseInt(line))
  .reduce((acc, val) => acc + val, 0)

console.log(result)
