import { readFile } from '../../utils/file-utils.js'

const IS_EXAMPLE = false
const FILE_NAME = IS_EXAMPLE ? 'input/example.txt' : 'input/input.txt'
const NUMBER_OF_PAIRS = IS_EXAMPLE ? 5 : 40000000

const FACTOR_A = 16807
const FACTOR_B = 48271
const DENOMINATOR = 2147483647

const generators = readFile(FILE_NAME).map((line) => {
  return { value: parseInt(/^Generator [AB] starts with (\d+)$/.exec(line)[1]) }
})

generators[0].factor = FACTOR_A
generators[1].factor = FACTOR_B

const get16RightMostBits = (value) => value.toString(2).padStart(32, '0').slice(16)

let result = 0
for (let _ = 0; _ < NUMBER_OF_PAIRS; _++) {
  for (let i = 0; i < generators.length; i++) {
    const generator = generators[i]
    generator.value = (generator.value * generator.factor) % DENOMINATOR
  }

  if (get16RightMostBits(generators[0].value) === get16RightMostBits(generators[1].value)) {
    result++
  }
}

console.log(result)
