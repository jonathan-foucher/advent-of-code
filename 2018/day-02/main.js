import { readFile } from '../../utils/file-utils.js'

const FILE_NAME = 'input/input.txt'

const ids = readFile(FILE_NAME)

let twoLettersCount = 0
let threeLettersCount = 0
for (const id of ids) {
  const letters = id.split('')
  const counts = {}
  for (const letter of letters) {
    const value = (counts[letter] ?? 0) + 1
    counts[letter] = value
  }

  if (Object.values(counts).includes(2)) {
    twoLettersCount++
  }

  if (Object.values(counts).includes(3)) {
    threeLettersCount++
  }
}

const result = twoLettersCount * threeLettersCount
console.log(result)
