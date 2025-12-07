import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const INPUT = readFile(FILE_NAME)[0]
const COLUMN = parseInt(/(?<=column )\d+/.exec(INPUT)[0])
const ROW = parseInt(/(?<=row )\d+/.exec(INPUT)[0])

const FIRST_CODE = 20151125
const MULT_VALUE = 252533
const MOD_VALUE = 33554393

let number = 0
for (let i = 1; i <= COLUMN; i++) {
  number += i
}
for (let i = 1; i <= ROW - 1; i++) {
  number += COLUMN + i - 1
}

let newMult = MULT_VALUE
let i = 1
const cache = new Map()
while (i * 2 + 1 <= number) {
  i = i * 2
  newMult = (newMult * newMult) % MOD_VALUE
  cache.set(i, newMult)
}

const mults = [newMult]
let sum = i + 1
while (sum !== number) {
  i = 1
  while (i * 2 + sum <= number) {
    i = i * 2
  }
  mults.push(cache.get(i))
  sum += i

  if (sum + 1 === number) {
    mults.push(MULT_VALUE)
    sum++
  }
}

newMult = mults[0]
for (let j = 1; j < mults.length; j++) {
  newMult = (newMult * mults[j]) % MOD_VALUE
}

console.log((FIRST_CODE * newMult) % MOD_VALUE)
