import { readFile } from '../../utils/javascript/file-utils'

const numbers = [
  { str: 'one', n: 1 },
  { str: 'two', n: 2 },
  { str: 'three', n: 3 },
  { str: 'four', n: 4 },
  { str: 'five', n: 5 },
  { str: 'six', n: 6 },
  { str: 'seven', n: 7 },
  { str: 'eight', n: 8 },
  { str: 'nine', n: 9 },
]

const reversedNumbers = numbers.map((number) => {
  return {
    str: number.str.split('').reverse().join(''),
    n: number.n,
  }
})

const getFirstDigit = (str, isReversed = false) => {
  let updated = false
  let res = isReversed ? str.split('').reverse().join('') : str
  const nArray = isReversed ? reversedNumbers : numbers
  do {
    const numbersToReplace = []
    nArray
      .filter((number) => res.includes(number.str))
      .forEach((number) => {
        numbersToReplace[res.indexOf(number.str)] = number
      })

    numbersToReplace.forEach((number) => {
      res = res.replace(number.str, number.n)
    })

    updated = numbersToReplace.length > 0
  } while (updated)

  return res.split('').find((char) => !isNaN(char))
}

const result = readFile('input/input.txt')
  .map((line) => getFirstDigit(line) + getFirstDigit(line, true))
  .filter((line) => line)
  .map((line) => parseInt(line))
  .reduce((acc, val) => acc + val, 0)

console.log(result)
