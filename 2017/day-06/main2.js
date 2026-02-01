import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const banks = readFile(FILE_NAME)[0]
  .split(/\s+/)
  .map((str) => parseInt(str))

const getNumberOfCycles = (banks, n = 0, states = []) => {
  const currentState = banks.join('-')
  if (states.includes(currentState)) {
    return states.length - states.findIndex((value) => value === currentState)
  }
  states.push(currentState)

  let max = banks[0]
  let maxIndex = 0
  for (let i = 1; i < banks.length; i++) {
    if (banks[i] > max) {
      max = banks[i]
      maxIndex = i
    }
  }

  banks[maxIndex] = 0
  let i = maxIndex
  while (max > 0) {
    i = (i + 1) % banks.length
    banks[i]++
    max--
  }

  n++
  return getNumberOfCycles(banks, n, states)
}

const result = getNumberOfCycles(banks)
console.log(result)
