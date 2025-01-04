import { readFile } from '../../utils/javascript/file-utils'

const FILE_NAME = 'input/input.txt'

const INPUT = readFile(FILE_NAME)[0]
const ROW = parseInt(/(?<=row )\d+/.exec(INPUT)[0])
const COLUMN = parseInt(/(?<=column )\d+/.exec(INPUT)[0])

const FIRST_CODE = 20151125
const MULT_VALUE = 252533
const MOD_VALUE = 33554393

let result = FIRST_CODE

let number = 0
for (let i = 1; i <= COLUMN; i++) {
  number += i
}
for (let i = 1; i <= ROW - 1; i++) {
  number += COLUMN + i - 1
}

for (let _ = 1; _ < number; _++) {
  result = (result * MULT_VALUE) % MOD_VALUE
}

console.log(result)
